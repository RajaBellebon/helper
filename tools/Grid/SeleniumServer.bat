@echo off
cd "\Program Files (x86)\Windows Resource Kits\Tools"
instsrv.exe SeleniumNode "C:\Program Files (x86)\Windows Resource Kits\Tools\srvany.exe"
REGEDIT.EXE /S SeleniumNode.reg
echo "Install Complete"
pause