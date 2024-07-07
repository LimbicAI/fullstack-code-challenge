@echo off

docker-compose down
docker-compose up -d

REM or use: "npm install && npm run start" # to run locally