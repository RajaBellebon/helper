load('./jquery.js');
load('./galen-pages.extras.js');
load('./properties.js');

beforeTest(() => {
  const driver = createDriver(properties.serverUrl, '1024x768');
  session.put('driver', driver);
});

afterTest(() => {
  const driver = session.get('driver');
  driver.quit();
});
