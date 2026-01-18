# Kill all node processes
Write-Host "Stopping all Node.js processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Clear ts-node cache
Write-Host "Clearing ts-node cache..." -ForegroundColor Yellow
if (Test-Path "$env:TEMP\ts-node-*") {
    Remove-Item "$env:TEMP\ts-node-*" -Recurse -Force
}
if (Test-Path ".\.ts-node") {
    Remove-Item ".\.ts-node" -Recurse -Force
}

Write-Host "`nStarting server..." -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Cyan
