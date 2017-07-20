const listingsSelector = require('../../pages/listings').elements;
const expected = require('../../nightwatch.globals');

let listings;
let navigate;
let core;
let currentBrowser;
const globals = expected.default;

module.exports = {
  '@tags': ['ci', 'ci-prod'],
  before: (client) => {
    listings = client.page.listings();
    navigate = client.page.navigate();
    core = client.page.core();
    currentBrowser = client.options.desiredCapabilities.browserName;
    core.resizeIe();
  },
  // TODO: Add the other tests that cover PP Elite (Gold), PP Standard, Elite, Standard
  // Those tests are currently in the listings.js
  'On search page, should be able to navigate to a Premium Plus listing': () => {
    if (['ie', 'chrome'].indexOf(currentBrowser) !== -1) {
      // Test is hanging in safari but it is covered by iphone and ipad tests
      navigate.toSearchPageSydney();
      listings
        .navigateToFirstPremiumPlus()
        .waitForElementVisible(listingsSelector.mediaBanner, 30000)
        .verify.attributeEquals('@productType', 'content', 'PremiumPlus');
    }
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      navigate.toSearchPageBeadell();
      listings.verify.visible(listingsSelector.firstPremiumPlusBeadell);
    }
  },

  'On search page, should be able to navigate to a Premium Project listing': () => {
    navigate.toSearchPageBeadell();
    if (globals.deviceListTotal.indexOf(currentBrowser) !== -1) {
      listings.verify.visible('@project');
    }
  },

  'On search page, should be able to navigate to a Project Child listing': (client) => {
    if (globals.deviceListTotal.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'ie') {
        listings.verify.visible('@projectChildListing');
      }
    }
  },

  after: (client) => {
    client.end();
  },
};
