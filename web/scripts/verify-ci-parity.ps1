# CI parity verifier — matches .github/workflows/ci.yml lint-and-build job.
# Run from repo root: ./web/scripts/verify-ci-parity.ps1

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "../..")
Push-Location $repoRoot

try {
    Write-Host "Running CI parity bundle (npm run ci:check --prefix web)..." -ForegroundColor Cyan
    npm run ci:check --prefix web
    if ($LASTEXITCODE -ne 0) {
        throw "ci:check failed with exit code $LASTEXITCODE"
    }

    Write-Host "`nLocal CI parity check passed." -ForegroundColor Green

    $ghCandidates = @(
        (Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"),
        (Join-Path ${env:LOCALAPPDATA} "Programs\GitHub CLI\gh.exe"),
        "gh"
    )

    $gh = $ghCandidates | Where-Object { $_ -eq "gh" -or (Test-Path $_) } | Select-Object -First 1
    if ($gh) {
        Write-Host "After push, verify remote CI with:" -ForegroundColor DarkGray
        Write-Host "  & `"$gh`" run list --repo Growrix/Agency --branch main --limit 1" -ForegroundColor DarkGray
        Write-Host "(Requires: gh auth login)" -ForegroundColor DarkGray
    }
}
finally {
    Pop-Location
}
