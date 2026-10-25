@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Install Node.js 24 LTS, then reopen this file.
 pause
 exit /b 1
)
call npm run build
if errorlevel 1 (
 echo Build failed. Keep this window open and read the error above.
 pause
 exit /b 1
)
echo Open http://localhost:4173 in Chrome or Edge. Keep this window open.
call npm run preview
pause
