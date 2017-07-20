@echo off
cd "\Program Files (x86)\Windows Resource Kits\Tools"
instsrv.exe SeleniumHub "C:\Program Files (x86)\Windows Resource Kits\Tools\srvany.exe"
instsrv.exe SeleniumNode "C:\Program Files (x86)\Windows Resource Kits\Tools\srvany.exe"
REGEDIT.EXE /S SeleniumHub.reg
echo "Install Complete"
pause