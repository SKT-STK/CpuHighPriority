@echo off
SETLOCAL
SET PATH=%~dp0;%PATH%

REG ADD "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\%~1\PerfOptions" /v "CpuPriorityClass" /t "REG_DWORD" /d "3" /f

ENDLOCAL
exit
