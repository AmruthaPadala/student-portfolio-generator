@echo off
echo ===================================================
echo Starting Student Digital Portfolio Generator
echo ===================================================

echo [1/2] Starting Spring Boot Backend (Port 8080)...
start "Backend - Spring Boot" cmd /k "cd /d %~dp0backend && java -jar target\generator-backend-1.0.0.jar"

echo [2/2] Starting React Vite Frontend (Port 5173)...
start "Frontend - Vite React" cmd /k "cd /d %~dp0frontend && npm run dev"

echo ===================================================
echo Applications launched!
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo ===================================================
timeout /t 5
