load('./../core/init.js');
load('./../pages/page1.js');
load('./../core/properties.js');

test('Sample Page Tests', () => {
  const driver = session.get('driver');
  resize(driver, properties.desktop.size);
  const sp = new Samplepage(driver);
  sp.navigateTo();
  sp.email.typeText('tester@test.com');
  sp.password.typeText('password');
  sp.submitButton.click();
  checkLayout({
    driver,
    spec: 'specs/page1.gspec',
    tags: properties.desktop.tags,
  });
});
