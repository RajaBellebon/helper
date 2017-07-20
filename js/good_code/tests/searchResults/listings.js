const expected = require('../../nightwatch.globals');
const selector = require('../../pages/listings').elements;

const desktopScreen = expected.default.screenResolution.desktop;

let navigate;
let listings;
let nameMatches;

function searchResultsViewCheck(client, displayViewLink, displayViewIcon, displayViewText, text) {
  client
    .verify.visible(selector.searchToolBar)
    .verify.visible(displayViewLink)
    .verify.visible(displayViewIcon)
    .verify.visible(displayViewText)
    .expect.element(displayViewText).text.to.equal(text);
}

function sortUICheck(client) {
  client
    .verify.visible(selector.searchSort)
    .expect.element(selector.searchSort).text.to.equal('Featured');
  client
    .click(selector.searchSort)
    .waitForElementVisible(selector.menuOuter, 2000)
    .page.core().getElements(selector.selectOptions, (sortOptions) => {
      client.verify.equal(expected.default.sortFilters.options.length, sortOptions.length);
      sortOptions.forEach((option) => {
        client.page.core.getElementIdText(option.ELEMENT, (optionText) => {
          nameMatches = expected.default.sortFilters.options.filter(
            expectedOption => expectedOption === optionText
          );
          client.verify.equal(nameMatches.length, 1, (`navlink found on page: ${optionText}`));
        });
      });
    })
    .click(selector.searchSort);
}

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    navigate = client.page.navigate();
    listings = client.page.listings();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPage();
  },

  'On the search page, they should be able to view a list of listings': (client) => {
    searchResultsViewCheck(client, selector.searchList,
      selector.searchListIcon, selector.searchListText, 'LIST');
    client
      .verify.cssClassPresent(selector.searchList, 'is-active')
      .page.core().getElements(selector.searchResults, (listingsResults) => {
        client.verify.notEqual(0, listingsResults.length, 'expected more than 0 listings');
      });
  },
  // This test is commented because it needs to be run against stage as localhost does not have access to Map
  // 'On the search page, they should be able to display a map view of the listings': (client) => {
  //   navigate.toSearchPage();
  //   searchResultsViewCheck(client, selector.searchMap, selector.searchMapIcon, selector.searchMapText, 'MAP');
  //   listings
  //     .verify.urlEquals(`${client.launchUrl}/sale/vaucluse-nsw-2030/?displaymap=1`)
  //     .verify.elementPresent('@googleMap');
  // },

  'On the search page, they should be able to sort the listings': (client) => {
    navigate.toSearchPage();
    sortUICheck(client);
  },

  'All Tests related to sort will fail because of a bug #481': () => {
   //  console.log('https://github.com/domain-group/fe-server-search-results/issues/481');
  },
  // Those tests are failing because of https://github.com/domain-group/fe-server-search-results/issues/481
  // 'On the search page, they should be able to sort the listings by Featured': (client) => {
  //   listings
  //     .changeSortFiltersTo('Featured')
  //     .verify.urlEquals(`${client.launchUrl}/sale/vaucluse-nsw-2030/`)
  //     .verify.containsText('@searchSort', 'Featured');
  // },

  // 'On the search page, they should be able to sort the listings by Newest': () => {
  //   listings
  //     .changeSortFiltersTo('Newest')
  //     .verify.urlContains('/sale/vaucluse-nsw-2030/?sort=dateupdated-desc')
  //     .verify.containsText('@searchSort', 'Newest');
  // },

  // 'On the search page, they should be able to sort the listings by Lowest Price': () => {
  //   listings
  //     .changeSortFiltersTo('Lowest price')
  //     .verify.urlContains('/sale/vaucluse-nsw-2030/?sort=price-asc')
  //     .verify.containsText('@searchSort', 'Lowest price');
  // },

  // 'On the search page, they should be able to sort the listings by Highest Price': () => {
  //   listings
  //     .changeSortFiltersTo('Highest price')
  //     .verify.urlContains('/sale/vaucluse-nsw-2030/?sort=price-desc')
  //     .verify.containsText('@searchSort', 'Highest price');
  // },

  // 'On the search page, they should be able to sort the listings by Earliest Inspection': () => {
  //   listings
  //     .changeSortFiltersTo('Earliest inspection')
  //     .verify.urlContains('/sale/vaucluse-nsw-2030/?sort=inspectiontime-asc')
  //     .verify.containsText('@searchSort', 'Earliest inspection');
  // },

  // 'On the search page, they should be able to sort the listings by Suburb': () => {
  //   listings
  //     .changeSortFiltersTo('Suburb')
  //     .verify.urlContains('/sale/vaucluse-nsw-2030/?sort=suburb-asc')
  //     .verify.containsText('@searchSort', 'Suburb');
  // },

  'On the search page, they should be able to navigate to a PP Standard listing': () => {
    listings
      .navigateToFirstPPStandard()
      .verify.attributeEquals('@productType', 'content', 'StandardPp');
    navigate.goBack();
  },

  'On the search page, they should be able to navigate to a Standard listing': () => {
    listings
      .navigateToFirstStandard()
      .verify.attributeEquals('@productType', 'content', 'Standard');
    navigate.goBack();
  },

  'On the search page, they should be able to navigate to an Elite listing': () => {
    navigate.toSearchPageNumber(2);
    listings
      .navigateToFirstElite()
      .verify.attributeEquals('@productType', 'content', 'Elite');
  },

  'On the search page, they should be able to navigate to a PP Elite listing': () => {
    navigate.toSearchPageSydneyPage2();
    listings
      .navigateToFirstPPElite()
      .verify.attributeEquals('@productType', 'content', 'ElitePp');
  },

  after: (client) => {
    client.end();
  },
};
