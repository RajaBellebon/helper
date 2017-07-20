load('./../core/properties.js');

this.Homepage = $page('Homepage', {
  logo: '.logo[title="Domain homepage"]',
  dreamHomes: '.dream-homes',
  navigateTo: function navigateTo() {
    this.open(properties.serverUrl);
    return this.waitForIt();
  }
});