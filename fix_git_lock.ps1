
Write-Host "Killing git processes..."
taskkill /F /IM git.exe
Start-Sleep -Seconds 1

$lockFile = ".git\index.lock"
if (Test-Path $lockFile) {
    Write-Host "Removing lock file..."
    Remove-Item $lockFile -Force
}

Write-Host "Adding changes..."
git add .

Write-Host "Committing..."
git commit -m "fix: use npx serve on render"

Write-Host "Pushing..."
git push
