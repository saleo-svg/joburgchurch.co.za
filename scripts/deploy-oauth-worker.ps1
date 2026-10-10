# ============================================================
# Deploy Sveltia CMS OAuth Worker to Cloudflare
# ============================================================
# Purpose: Deploy the GitHub OAuth bridge worker required by
#          Sveltia CMS at https://joburgchurch.co.za/admin/
#
# Prereqs (you do these ONCE, by hand):
#   1. Create GitHub OAuth App at https://github.com/settings/developers
#      - Homepage URL:        https://joburgchurch.co.za
#      - Callback URL:        https://joburgchurch-cms-auth.<sub>.workers.dev/callback
#      (Callback will be corrected after first deploy; use a placeholder for now)
#   2. Have a Cloudflare account (free tier is fine)
#   3. Node.js 18+ and npm installed
#
# What this script does:
#   - Reads GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET / CF_ACCOUNT_ID from .env.local
#   - Clones sveltia-cms-auth to a temp folder (or pulls if already cloned)
#   - Installs deps
#   - Writes wrangler.toml with your project name + secrets
#   - Runs `wrangler deploy`
#   - Prints the deployed worker URL (you paste it into config.yml)
#
# Usage:
#   1. Add to .env.local:
#        GITHUB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
#        GITHUB_CLIENT_SECRET=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
#        CF_ACCOUNT_ID=zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
#      (do NOT commit .env.local)
#   2. Run:
#        powershell -ExecutionPolicy Bypass -File scripts/deploy-oauth-worker.ps1
# ============================================================

$ErrorActionPreference = "Stop"

$root       = Split-Path -Parent $PSScriptRoot
$envPath    = Join-Path $root ".env.local"
$workerRepo = "https://github.com/sveltia/sveltia-cms-auth.git"
$workerDir  = Join-Path $root "..\sveltia-cms-auth"   # sibling folder
$workerName = "joburgchurch-cms-auth"

# ---- Load .env.local into current shell ----------------------
if (-not (Test-Path -LiteralPath $envPath)) {
  throw ".env.local not found at $envPath. Create it with GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CF_ACCOUNT_ID."
}
Get-Content -LiteralPath $envPath | ForEach-Object {
  $line = $_.Trim()
  if (-not $line -or $line.StartsWith("#") -or -not $line.Contains("=")) { return }
  $parts = $line.Split("=", 2)
  $name  = $parts[0].Trim()
  $value = $parts[1].Trim().Trim('"').Trim("'")
  [Environment]::SetEnvironmentVariable($name, $value, "Process")
}

foreach ($k in "GITHUB_CLIENT_ID","GITHUB_CLIENT_SECRET","CF_ACCOUNT_ID") {
  if (-not $env:$k) { throw "Missing $k in .env.local" }
}

# ---- Clone or update sveltia-cms-auth ------------------------
if (-not (Test-Path -LiteralPath $workerDir)) {
  Write-Host "==> Cloning sveltia-cms-auth ..." -ForegroundColor Cyan
  git clone $workerRepo $workerDir
} else {
  Write-Host "==> Updating sveltia-cms-auth (already cloned) ..." -ForegroundColor Cyan
  Push-Location $workerDir
  try { git pull --ff-only } catch { Write-Host "  (pull skipped: $_.Exception.Message)" -ForegroundColor Yellow }
  Pop-Location
}

# ---- Install dependencies -----------------------------------
Write-Host "==> Installing worker deps ..." -ForegroundColor Cyan
Push-Location $workerDir
try {
  npm install --no-audit --no-fund
}
finally {
  Pop-Location
}

# ---- Write wrangler.toml (project name + compatibility date) -
$wranglerPath = Join-Path $workerDir "wrangler.toml"
$wranglerBody = @"
name = "$workerName"
main = "src/index.js"
compatibility_date = "2024-09-23"

[vars]
GITHUB_REPO   = "saleo-svg/joburgchurch.co.za"
GITHUB_BRANCH = "master"

# Secrets (set via `wrangler secret put` in the script below)
# GITHUB_CLIENT_ID
# GITHUB_CLIENT_SECRET
"@
Set-Content -LiteralPath $wranglerPath -Value $wranglerBody -Encoding UTF8
Write-Host "==> wrangler.toml written." -ForegroundColor Green

# ---- Authenticate wrangler (interactive first time) ---------
Write-Host ""
Write-Host "==> Cloudflare login (browser will open if not already authenticated) ..." -ForegroundColor Cyan
Write-Host "    If you prefer non-interactive: set CLOUDFLARE_API_TOKEN in .env.local" -ForegroundColor Yellow
Push-Location $workerDir
try {
  if ($env:CLOUDFLARE_API_TOKEN) {
    Write-Host "    Using CLOUDFLARE_API_TOKEN from env." -ForegroundColor Green
    $env:CLOUDFLARE_ACCOUNT_ID = $env:CF_ACCOUNT_ID
    npx wrangler login --api-token $env:CLOUDFLARE_API_TOKEN | Out-Null
  } else {
    npx wrangler login
  }

  # ---- Push secrets ----------------------------------------
  Write-Host "==> Uploading GitHub OAuth secrets to Worker ..." -ForegroundColor Cyan
  $env:CLOUDFLARE_ACCOUNT_ID = $env:CF_ACCOUNT_ID
  $secretInput = $env:GITHUB_CLIENT_SECRET
  $secretInput | npx wrangler secret put GITHUB_CLIENT_SECRET | Out-Null
  $env:GITHUB_CLIENT_ID | npx wrangler secret put GITHUB_CLIENT_ID | Out-Null

  # ---- Deploy ---------------------------------------------
  Write-Host "==> Deploying worker ..." -ForegroundColor Cyan
  $deployOut = npx wrangler deploy 2>&1 | Out-String
  Write-Host $deployOut

  # ---- Extract deployed URL --------------------------------
  $workerUrl = ($deployOut | Select-String -Pattern "https://[a-z0-9-]+\.workers\.dev" | Select-Object -First 1).Matches.Value
  if (-not $workerUrl) {
    Write-Host "!! Could not auto-detect worker URL. Check the output above." -ForegroundColor Red
  } else {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "  WORKER DEPLOYED SUCCESSFULLY" -ForegroundColor Green
    Write-Host "  URL: $workerUrl" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "NEXT STEPS:" -ForegroundColor Cyan
    Write-Host "  1. Go to https://github.com/settings/developers" -ForegroundColor White
    Write-Host "     Update Authorization callback URL to:" -ForegroundColor White
    Write-Host "       ${workerUrl}/callback" -ForegroundColor Yellow
    Write-Host "  2. Edit public/admin/config.yml:" -ForegroundColor White
    Write-Host "     Replace YOUR_SUBDOMAIN in base_url with the worker subdomain." -ForegroundColor White
    Write-Host "     i.e.  base_url: $workerUrl" -ForegroundColor Yellow
    Write-Host "  3. Commit + push to master — Cloudflare Pages auto-deploys." -ForegroundColor White
    Write-Host "  4. Visit https://joburgchurch.co.za/admin/ and log in with GitHub." -ForegroundColor White
  }
}
finally {
  Pop-Location
}