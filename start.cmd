@echo off
title Geboortedatum-wiel
set PATH=C:\Users\reint\.local\node\node-v22.11.0-win-x64;%PATH%
cd /d "%~dp0"
start "" http://localhost:3240
node serve.mjs
pause
