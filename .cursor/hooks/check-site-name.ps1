# Optional hook: warns when an HTML file inside sites/ does not follow the
# "NN. site-name-website.html" naming convention. Observational only; never blocks.

$ErrorActionPreference = 'SilentlyContinue'

$raw = [Console]::In.ReadToEnd()
$payload = $null
try { $payload = $raw | ConvertFrom-Json } catch { }

$filePath = $null
if ($payload) {
    if ($payload.file_path) { $filePath = [string]$payload.file_path }
    elseif ($payload.filePath) { $filePath = [string]$payload.filePath }
}

if (-not $filePath) {
    Write-Output '{"continue": true}'
    exit 0
}

$normalized = $filePath -replace '\\', '/'

$fileName = Split-Path -Leaf $normalized

# HTML preview track: sites/NN. site-name-website.html
if ($normalized -match '(^|/)sites/[^/]+\.html$') {
    if ($fileName -match '^\d{2,}\. [a-z0-9]+(-[a-z0-9]+)*-website\.html$') {
        Write-Output '{"continue": true}'
        exit 0
    }
    $msg = "Naming convention warning: '$fileName' does not match 'NN. site-name-website.html' (zero-padded serial, kebab-case name). Rename the file to follow the sites/ output contract."
    $out = @{ continue = $true; agentMessage = $msg } | ConvertTo-Json -Compress
    Write-Output $out
    exit 0
}

# Next.js production track: Frontend_Nextjs/NN-site-name/
if ($normalized -match '(^|/)Frontend_Nextjs/[^/]+/') {
    $folderName = ($normalized -split 'Frontend_Nextjs/')[1] -split '/' | Select-Object -First 1
    if ($folderName -match '^\d{2,}-[a-z0-9]+(-[a-z0-9]+)*$') {
        Write-Output '{"continue": true}'
        exit 0
    }
    $msg = "Naming convention warning: '$folderName' does not match 'NN-site-name' (zero-padded serial, kebab-case name). Rename the folder to follow the Frontend_Nextjs/ output contract."
    $out = @{ continue = $true; agentMessage = $msg } | ConvertTo-Json -Compress
    Write-Output $out
    exit 0
}

Write-Output '{"continue": true}'
exit 0
