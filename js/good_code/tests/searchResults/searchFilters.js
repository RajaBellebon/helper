const filtersSelector = require('../../pages/filters').elements;
// const expected = require('../../nightwatch.globals');

let filters;
let navigate;
let pagination;
let core;
let currentBrowser;
// const globals = expected.default;

function verifyBasicFiltersSaved(client, arrCheck) {
  const selectCheck = [
    filtersSelector.locationValue, filtersSelector.priceMin, filtersSelector.priceMax,
    filtersSelector.propertyTypesValues, filtersSelector.bedRoomValue, filtersSelector.bathRoomValue,
    filtersSelector.parkingValue,
  ];
  selectCheck.forEach((check, idx) => {
    client.page.core().getElementText(check, (err, filter) => {
      client.verify.equal(filter.replace('\n', '').trim(), arrCheck[idx]);
    });
  });
}

function verifyUpdateSearchUrl(client) {
  client.url((updatedUrl) => {
    client.verify.equal(updatedUrl.value,
      `${client.launchUrl}/sale/beadell-wa-6440/?ptype=duplex,house,semi-detached,` +
      'terrace,town-house,villa,apartment-unit-flat,block-of-units,pent-house,studio' +
      '&bedrooms=1-4&bathrooms=2-any&price=50000-2000000&carspaces=1-3'
    );
  });
}

module.exports = {
  '@tags': ['ci', 'ci-prod'],
  before: (client) => {
    filters = client.page.filters();
    navigate = client.page.navigate();
    core = client.page.core();
    pagination = client.page.pagination();
    currentBrowser = client.options.desiredCapabilities.browserName;
    core.resizeIe();
  },

  'When updatings filters, should be redirected to the correct url with correct count results': (client) => {
    if (['firefox', 'chrome'].indexOf(currentBrowser) !== -1) {
      navigate.toSearchPageSale();
      filters.updateFilters(currentBrowser, 'Beadell', [filtersSelector.house, filtersSelector.apartment],
        [filtersSelector.bedRoom1, filtersSelector.bedRooms4],
        [filtersSelector.bathRooms2, filtersSelector.bathRooms5],
        [filtersSelector.parking1, filtersSelector.parkings3]);
      verifyUpdateSearchUrl(client);
      pagination.returnPropertyCount((err, propertyCount) => {
        client.verify.equal(propertyCount, 1);
      });
      filters.verify.title('1 Property for sale in Beadell, WA, 6440');
      verifyBasicFiltersSaved(client,
        ['Beadell, WA, 6440', '$50,000', '$2,000,000', 'House, Apartment', '1 - 4', '2 - 5+', '1 - 3']);
    }
  },

  'On search page, the filters should display/save the search values': (client) => {
    if (['chrome'].indexOf(currentBrowser) !== -1) {
      navigate.toSearchPageWithBasicFilters();
      // TODO: firefox and safari hang in BrowserStack
      verifyBasicFiltersSaved(client, ['Sydney Region, NSW', '$200,000', 'Any',
        'Duplex, Semi detached, Terrace, Townhouse, Villa', '3', '2', '1']);
      pagination.returnPropertyCount((err, propertyCount) => {
        client.verify.notEqual(0, propertyCount);
      });
      filters
        .click('@bedRoomsFilter')
        .verify.elementPresent('@numberOfresults');
    }
    // TODO: Those tests are commented as BS is hanging at the moment on real devices
    // if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
    //   navigate.toSearchPageWithBasicFilters();
    //   /* Verify if the filters are saved for mobile resolution is not
    //   required as per different implementation*/
    //   pagination.returnPropertyCount((err, propertyCount) => {
    //     client.verify.notEqual(0, propertyCount);
    //   });
    // }
  },

  after: (client) => {
    client.end();
  },
};
