/* eslint-disable no-unused-expressions */
load('./../core/init.js');
load('../pages/homepage.js');
load('../core/properties.js');
test('Homepage Tests', () => {
  const driver = session.get('driver');
  const device = properties.desktop;
  resize(driver, device.size);
  const homepage = new Homepage(driver);
  homepage.navigateTo();
  homepage.dreamHomes.scrollIntoView();
  checkLayout({
    driver,
    spec: 'specs/homepage.gspec',
    tags: device.tags,
  });
});
