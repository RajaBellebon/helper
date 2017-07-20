load('./jquery.js');
load('./galen-pages.extras.js');
load('./properties.js');

beforeTest(function () {
  var driver = createDriver(properties.serverUrl, '1024x768');
  session.put('driver', driver);
});

afterTest(function () {
  var driver = session.get('driver');
  driver.quit();
});