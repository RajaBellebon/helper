load('./../core/init.js');
load('./../pages/page1.js');
load('./../core/properties.js');

test('Sample Page Tests', function () {
  var driver = session.get('driver');
  resize(driver, properties.desktop.size);
  var sp = new Samplepage(driver);
  sp.navigateTo();
  sp.email.typeText('tester@test.com');
  sp.password.typeText('password');
  sp.submitButton.click();
  checkLayout({
    driver: driver,
    spec: 'specs/page1.gspec',
    tags: properties.desktop.tags
  });
});