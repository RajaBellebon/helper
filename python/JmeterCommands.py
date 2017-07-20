from pywinauto.application import Application
# Run a target application
app = Application().start(r"C:\apache-jmeter-3.0\bin\jmeter.bat")
# print app
# Select a template item
app.ApacheJmeter.menu_select("File->Templates")
