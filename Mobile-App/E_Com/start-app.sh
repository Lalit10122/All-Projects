#!/bin/bash

echo "Starting Chat App..."

echo ""
echo "1. Starting API Server..."
cd api
npm install
npm start &
API_PID=$!

echo ""
echo "2. Waiting 5 seconds for API server to start..."
sleep 5

echo ""
echo "3. Starting React Native App..."
cd ..
npm install
npx react-native run-android &
RN_PID=$!

echo ""
echo "Both servers are starting..."
echo "API Server: http://localhost:4000"
echo "React Native App: Check your emulator/device"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Wait for user to stop
wait 