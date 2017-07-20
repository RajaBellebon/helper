load('./../core/properties.js');

this.Samplepage = $page('Sample Page', {
  email: 'input.email', // css locator
  password: "xpath: //input[@class='password']", // xpath locator
  submitButton: 'id: submit', // id locator
  navigateTo: function navigateTo() {
    this.open(properties.serverUrl + '/page/url'); // navigating to target page
    return this.waitForIt(); // waiting for all above mentioned elements to load
  }
});