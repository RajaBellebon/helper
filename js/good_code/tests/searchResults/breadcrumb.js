
const listingsSelector = require('../../pages/listings').elements;
const expected = require('../../nightwatch.globals');

let navigate;
let core;
let currentBrowser;
const globals = expected.default;

function verifyTitle(client) {
  client.getTitle((title) => {
    client.verify.equal(
      title.includes('Real Estate Properties for sale in Vaucluse, NSW, 2030'), true,
      `The page title displayed is ${title}`);
  });
}

module.exports = {
  '@tags': ['ci', 'ci-prod'],
  before: (client) => {
    navigate = client.page.navigate();
    core = client.page.core();
    currentBrowser = client.options.desiredCapabilities.browserName;
    core.resizeIe();
  },

  'On search page - for 1 suburb - the correct location search page should be displayed with breadcrumb': (client) => {
    navigate.toSearchPage();
    if (globals.deviceDesktopList.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        verifyTitle(client);
        client
          .source((result) => {
            client.verify.equal(result.value.includes('ld+json'), true);
          })
          .verify.visible(listingsSelector.breadcrumbs)
          .page.core().getElements(listingsSelector.crumbs, (err, crumbs) => {
            client.verify.equal(crumbs.length, expected.default.crumbs.check.length);
            crumbs.forEach((crumb, idx) => {
              client.page.core().getElementIdText(crumb.ELEMENT, (error, text) => {
                client.verify.equal(text, expected.default.crumbs.check[idx]);
              });
            });
          });
      }
    }
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      verifyTitle(client);
    }
  },

  after: (client) => {
    client.end();
  },
};
