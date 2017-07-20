/* eslint-disable no-unused-expressions */
load('./../core/init.js');
load('../pages/homepage.js');
load('../core/properties.js');
test('Homepage Tests', function () {
  var driver = session.get('driver');
  var device = properties.desktop;
  resize(driver, device.size);
  var homepage = new Homepage(driver);
  homepage.navigateTo();
  homepage.dreamHomes.scrollIntoView();
  checkLayout({
    driver: driver,
    spec: 'specs/homepage.gspec',
    tags: device.tags
  });
});