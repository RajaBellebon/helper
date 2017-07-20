cd\
cd C:\Grid\
Java -Dwebdriver.chrome.driver=c:\\Grid\\lib\\ChromeDriver2.27\\chromedriver.exe -Dwebdriver.gecko.driver=c:\\Grid\\lib\\GeckoDriver0.11.1\\geckodriver.exe -Dwebdriver.ie.driver=C:\\Grid\\lib\\IEDriverServer3.0.0\\IEDriverServer.exe -jar selenium-server-standalone-3.0.1.jar -role node -nodeConfig DefaultNode.json -log C:\\Grid\\logs\\selenium.log