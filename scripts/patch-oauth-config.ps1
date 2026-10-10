# ============================================================
# Patch public/admin/config.yml with the deployed Worker URL
# ============================================================
# After running scripts/deploy-oauth-worker.ps1 you get a URL
# like: https://joburgchurch-cms-auth.<subdomain>.workers.dev
#
# Pass it as an argument:
#   powershell -ExecutionPolicy Bypass -File scripts/patch-oauth-config.ps1 `
#     -WorkerUrl "https://joburgchurch-cms-auth.YOUR-SUBDOMAIN.workers.dev"
#
# This script:
#   - Replaces the YOUR_SUBDOMAIN placeholder in public/admin/config.yml
#   - Validates the URL matches the expected shape
#   - Shows the resulting base_url line
# ============================================================

param(
  [Parameter(Mandatory = $true)]
  [string]$WorkerUrl
)

$ErrorActionPreference = "Stop"

# ---- Validate URL shape -------------------------------------
if ($WorkerUrl -notmatch '^https://[a-z0-9-]+\.workers\.dev/?$') {
  throw "WorkerUrl must look like: https://joburgchurch-cms-auth.XXX.workers.dev (got '$WorkerUrl')"
}
# Strip trailing slash for consistency
$WorkerUrl = $WorkerUrl.TrimEnd('/')

$configPath = Join-Path $PSScriptRoot "..\public\admin\config.yml"
$configPath = (Resolve-Path $configPath).Path

Write-Host "==> Patching $configPath" -ForegroundColor Cyan

$original = Get-Content -LiteralPath $configPath -Raw

$placeholder = "https://joburgchurch-cms-auth.YOUR_SUBDOMAIN.workers.dev"
if ($original -notmatch [regex]::Escape($placeholder)) {
  throw "Could not find placeholder '$placeholder' in config.yml. Already patched?"
}

$patched = $original.Replace($placeholder, $WorkerUrl)

# Bump a small comment so the file is visibly touched
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$patched = $patched.Replace(
  "# Sveltia CMS Backend",
  "# Sveltia CMS Backend`n# Last OAuth worker patch: $stamp (commit `$(git rev-parse --short HEAD))"
)

Set-Content -LiteralPath $configPath -Value $patched -Encoding UTF8 -NoNewline

# ---- Show result --------------------------------------------
Write-Host ""
Write-Host "==> Patched base_url line:" -ForegroundColor Green
Get-Content -LiteralPath $configPath | Select-String -Pattern "base_url" | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
Write-Host ""
Write-Host "NEXT STEP:" -ForegroundColor Cyan
Write-Host "  git add public/admin/config.yml" -ForegroundColor White
Write-Host "  git commit -m 'chore(cms): pin OAuth worker URL'" -ForegroundColor White
Write-Host "  git push" -ForegroundColor White
Write-Host "  Then visit https://joburgchurch.co.za/admin/ and log in." -ForegroundColor White