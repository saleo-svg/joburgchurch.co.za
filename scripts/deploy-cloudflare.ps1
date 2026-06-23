$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envPath = Join-Path $root ".env.local"

if (Test-Path -LiteralPath $envPath) {
  Get-Content -LiteralPath $envPath | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#") -or -not $line.Contains("=")) {
      return
    }

    $parts = $line.Split("=", 2)
    $name = $parts[0].Trim()
    $value = $parts[1].Trim().Trim('"').Trim("'")
    [Environment]::SetEnvironmentVariable($name, $value, "Process")
  }
}

if (-not $env:CLOUDFLARE_API_TOKEN) {
  throw "CLOUDFLARE_API_TOKEN is missing. Add it to .env.local or set it in the current shell."
}

if (-not $env:CLOUDFLARE_ACCOUNT_ID) {
  throw "CLOUDFLARE_ACCOUNT_ID is missing. Add it to .env.local or set it in the current shell."
}

Push-Location $root
try {
  npm run build
  npx wrangler pages deploy dist --project-name=joburgchurch
}
finally {
  Pop-Location
}
