const listingsSelector = require('../../pages/listings').elements;
const expected = require('../../nightwatch.globals');

let navigate;
let core;
let currentBrowser;
const globals = expected.default;


module.exports = {
  '@tags': ['ci', 'ci-prod'],
  before: (client) => {
    navigate = client.page.navigate();
    core = client.page.core();
    currentBrowser = client.options.desiredCapabilities.browserName;
    core.resizeIe();
  },

  'On search page, more than one TopSpot listings are displayed': (client) => {
    if (globals.deviceListTotal.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        navigate.toSearchPagePyrmont();
        client
          .verify.visible(listingsSelector.searchResultTopSpot)
          .verify.containsText(listingsSelector.topSpotFeaturedText, 'FEATURED')
          .verify.visible(listingsSelector.topSpotFeaturedCarousel)
          .verify.visible(listingsSelector.topSpotFeaturedTopSpotIndicator)
          .verify.visible(listingsSelector.topSpotFeaturedButton);
      }
    }
  },

  'On search page, should be able to navigate to a TopSpot listing': (client) => {
    if (['chrome', 'firefox', 'iPhone'].indexOf(currentBrowser) !== -1) {
      navigate.toSearchPageSydney();
      // Test is hanging in safari but it is covered by iphone and ipad tests
      client.page.core().getElements(listingsSelector.listingAddress, (err, address) => {
        client.page.core().getElementIdAttribute(address[0].ELEMENT, 'href', (error, url) => {
          client.verify.equal(url.includes('?topspot=1'), true,
            `If the test failed,it means this url${url} does not have topspot query`);
        });
      });
    }
  },

  'On search page, should be able to see the Featured Agency if no TopSpot': (client) => {
    if (['chrome', 'firefox', 'iPhone'].indexOf(currentBrowser) !== -1) {
      navigate.toSearchPageFeaturedAgency();
      client
        .verify.visible(listingsSelector.topSpotFeaturedAgency)
        .verify.attributeContains(listingsSelector.topSpotFeaturedAgency, 'href', 'domain.com.au/real-estate-agencies/')
        .verify.containsText(listingsSelector.topSpotFeaturedAgencyText, 'FEATURED AGENCY')
        .verify.attributeContains(listingsSelector.topSpotFeaturedAgencyLogo, 'src', 'domain.com.au/img/Agencys/')
        .verify.attributeContains(listingsSelector.topSpotFeaturedAgencyLogo, 'alt', 'Logo');
    }
  },

  after: (client) => {
    client.end();
  },
};
