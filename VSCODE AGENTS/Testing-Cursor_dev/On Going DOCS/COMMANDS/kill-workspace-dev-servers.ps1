param(
    [string]$WorkspaceRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Test-IsWorkspaceDevProcess {
    param(
        [Parameter(Mandatory = $true)]
        $Process,
        [Parameter(Mandatory = $true)]
        [string]$WorkspaceRoot
    )

    if (-not $Process.CommandLine) {
        return $false
    }

    if ($Process.CommandLine -notlike "*$WorkspaceRoot*") {
        return $false
    }

    if ($Process.Name -notmatch '^(node|npm|pnpm|yarn|bun|python)(\.exe)?$') {
        return $false
    }

    $devServerPattern = @(
        'next\\dist\\bin\\next"?\s+dev',
        'next\\dist\\server\\lib\\start-server\.js',
        '\\.next\\dev\\',
        'vite(\\.js)?(\.cmd)?"?\s+dev',
        'react-scripts(\.cmd)?"?\s+start',
        'astro(\.cmd)?"?\s+dev',
        'nuxt(\.cmd)?"?(\s+dev|\s+start)?',
        'webpack(-dev-server)?(\.cmd)?"?\s+serve',
        'sanity(\.cmd)?"?\s+dev',
        'storybook',
        'npm(\.cmd)?"?\s+run\s+dev',
        'pnpm(\.cmd)?"?\s+dev',
        'yarn(\.cmd)?"?\s+dev',
        'bun(\.exe)?"?\s+run\s+dev',
        'remix(\.cmd)?"?\s+dev'
    ) -join '|'

    return $Process.CommandLine -match $devServerPattern
}

$resolvedWorkspaceRoot = (Resolve-Path $WorkspaceRoot).Path
$processes = Get-CimInstance Win32_Process
$targets = @($processes | Where-Object { Test-IsWorkspaceDevProcess -Process $_ -WorkspaceRoot $resolvedWorkspaceRoot } | Sort-Object ProcessId -Unique)

Write-Host "Workspace root: $resolvedWorkspaceRoot"

if (-not $targets) {
    Write-Host "No workspace dev server processes found."
    exit 0
}

Write-Host "Matching workspace dev server processes:"
$targets | Select-Object ProcessId, Name, CommandLine | Format-Table -Wrap | Out-String | Write-Host

if ($DryRun) {
    Write-Host "Dry run only. No processes were stopped."
    exit 0
}

foreach ($target in $targets) {
    Stop-Process -Id $target.ProcessId -Force -ErrorAction Stop
    Write-Host ("STOPPED {0} {1}" -f $target.ProcessId, $target.Name)
}

$remaining = @(
    Get-CimInstance Win32_Process |
        Where-Object { Test-IsWorkspaceDevProcess -Process $_ -WorkspaceRoot $resolvedWorkspaceRoot } |
        Sort-Object ProcessId -Unique
)

if ($remaining) {
    Write-Host "Remaining matching workspace dev server processes:"
    $remaining | Select-Object ProcessId, Name, CommandLine | Format-Table -Wrap | Out-String | Write-Host
    exit 1
}

Write-Host "All matching workspace dev server processes were stopped."