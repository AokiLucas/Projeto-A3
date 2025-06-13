@echo off
REM Start ASP.NET backend
start "" dotnet run

REM Start React frontend
cd petvax-client
start "" npm start

REM Go back to root
cd ..

REM Open Swagger in default browser
start http://localhost:5248/swagger/