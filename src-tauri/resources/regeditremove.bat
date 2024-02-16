@echo off
SETLOCAL
SET PATH=%~dp0;%PATH%

REG DELETE "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\%~1" /f

ENDLOCAL
exit
