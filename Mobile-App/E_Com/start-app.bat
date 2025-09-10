@echo off
echo Starting Chat App...

echo.
echo 1. Starting API Server...
cd api
start "API Server" cmd /k "npm install && npm start"

echo.
echo 2. Waiting 5 seconds for API server to start...
timeout /t 5 /nobreak > nul

echo.
echo 3. Starting React Native App...
cd ..
start "React Native" cmd /k "npm install && npx react-native run-android"

echo.
echo Both servers are starting...
echo API Server: http://localhost:4000
echo React Native App: Check your emulator/device
echo.
echo Press any key to exit this window...
pause > nul 