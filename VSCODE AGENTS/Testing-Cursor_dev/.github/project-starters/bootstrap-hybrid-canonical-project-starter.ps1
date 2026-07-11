param(
    [Parameter(Mandatory = $true)]
    [string]$TargetRoot,

    [switch]$DryRun
)

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$starterRoot = Join-Path $scriptRoot "hybrid-canonical-project-starter"

if (-not (Test-Path -LiteralPath $starterRoot)) {
    throw "Starter package not found at $starterRoot"
}

if (-not (Test-Path -LiteralPath $TargetRoot)) {
    if (-not $DryRun) {
        New-Item -ItemType Directory -Path $TargetRoot -Force | Out-Null
    }
}

$createdDirectories = 0
$copiedFiles = 0
$skippedFiles = 0

 $excludedRelativePaths = @(
    'README.md'
)

$sourceFiles = Get-ChildItem -LiteralPath $starterRoot -Recurse -File

foreach ($sourceFile in $sourceFiles) {
    $relativePath = $sourceFile.FullName.Substring($starterRoot.Length).TrimStart('\')

    if ($excludedRelativePaths -contains $relativePath) {
        continue
    }

    $targetPath = Join-Path $TargetRoot $relativePath
    $targetDirectory = Split-Path -Parent $targetPath

    if (-not (Test-Path -LiteralPath $targetDirectory)) {
        if (-not $DryRun) {
            New-Item -ItemType Directory -Path $targetDirectory -Force | Out-Null
        }
        $createdDirectories++
    }

    if (Test-Path -LiteralPath $targetPath) {
        $skippedFiles++
        continue
    }

    if (-not $DryRun) {
        Copy-Item -LiteralPath $sourceFile.FullName -Destination $targetPath -Force
    }

    $copiedFiles++
}

$result = [pscustomobject]@{
    starterRoot = $starterRoot
    targetRoot = (Resolve-Path -LiteralPath $TargetRoot).Path
    dryRun = [bool]$DryRun
    createdDirectories = $createdDirectories
    copiedFiles = $copiedFiles
    skippedFiles = $skippedFiles
}

$result | ConvertTo-Json -Depth 4