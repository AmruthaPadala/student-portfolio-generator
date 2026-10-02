# Windows PowerShell Launcher for Student Digital Portfolio Generator
$root = $PSScriptRoot

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Starting Student Digital Portfolio Generator" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Write-Host "[1/2] Starting Spring Boot Backend (Port 8080)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; java -jar target\generator-backend-1.0.0.jar"

Write-Host "[2/2] Starting React Vite Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host "===================================================" -ForegroundColor Green
Write-Host "Both services launched successfully!" -ForegroundColor Green
Write-Host "Backend API:  http://localhost:8080" -ForegroundColor Green
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
