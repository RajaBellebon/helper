/* eslint-disable no-console */
const intersection = require('lodash').intersection;
const selector = require('../../pages/pagination').elements;
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;

let pagination;
let navigate;

function getErrorsCheckPageAndBack(client, urlQuery) {
  client.getLog('browser', (result) => {
    client.verify.equal(result.length, 0, console.log(result));
  });
  client.verify.urlEquals(`${client.launchUrl}/sale/vaucluse-nsw-2030/${urlQuery}`);
  client.back();
}

function getNoErrorsCheckPageAndBack(client, urlQuery) {
  // When all console errors fixed = add back errors logging
  client.verify.urlEquals(`${client.launchUrl}/sale/vaucluse-nsw-2030/${urlQuery}`);
  client.back();
}

function navigateToNextPageCheck(client) {
  client.page.pagination().clickNextPage();
  getNoErrorsCheckPageAndBack(client, '?page=2');
  client.page.navigate().toSearchPage2();
  getNoErrorsCheckPageAndBack(client, '?page=2');
  client.page.pagination().click(selector.secondPage);
  getNoErrorsCheckPageAndBack(client, '?page=2');
}

function isNumeric(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function paginatorBarUICheck(client) {
  client
    .verify.visible(selector.paginationBar)
    .verify.visible(selector.pages)
    .verify.visible(selector.prev)
    .verify.visible(selector.next);
}

function pageNumbersCheck(client) {
  client.page.core().getElements(selector.paginationItem, (pages) => {
    client.verify.equal(true, pages.length > 0);
    pages.forEach((page) => {
      client.page.core().getElementIdText(page.ELEMENT, (pageVal) => {
        client.verify.equal(isNumeric(pageVal), true, `page number ${pageVal} is a number`);
      });
    });
  });
}

function navigateBackCheck(client) {
  client
    .page.pagination().clickNextPage()
    .verify.cssClassNotPresent(selector.prevPage, 'is-disabled')
    .page.pagination().clickPreviousPage();
  getErrorsCheckPageAndBack(client, '');

  client.page.navigate().toSearchPage1();
  getErrorsCheckPageAndBack(client, '');
  client
    .page.navigate().toSearchPage()
    .page.pagination()
    .clickNextPage()
    .click('@firstPage');
  getErrorsCheckPageAndBack(client, '');

  client
    .page.navigate().toSearchPage()
    .page.pagination().clickNextPage()
    .back();
  getErrorsCheckPageAndBack(client, '');
}

function prevNextCheck(client) {
  client
    .verify.cssClassPresent(selector.prev, 'is-disabled')
    .verify.cssClassNotPresent(selector.next, 'is-disabled')
    .page.pagination().clickLastPage()
    .verify.cssClassPresent(selector.next, 'is-disabled')
    .verify.cssClassNotPresent(selector.prev, 'is-disabled')
    .click(selector.firstPage)
    .verify.cssClassPresent(selector.prev, 'is-disabled')
    .verify.cssClassNotPresent(selector.next, 'is-disabled');
}

function navigateOutsidePageLimitsCheck(client) {
  client.page.pagination().returnLastPage((err, pageNumber) => {
    client.page
      .navigate().toSearchPageNumber(pageNumber)
      .pagination().returnPropertyCount((error, propertyCount) => {
        client
          .verify.equal(0, propertyCount, `Property count on the page should be 0 but displayed:${propertyCount}`)
          .verify.elementPresent(selector.noResult);
      });
  });
  client
    .page.navigate().toSearchPageNumber(-1)
    .verify.cssClassPresent(selector.firstPage, 'is-current')
    .verify.cssClassNotPresent(selector.secondPage, 'is-current');
}

function differentListingsOnDifferentPagesCheck(client) {
  client.page.pagination().storeListingsIDs((err, listingsId1) => {
    client.page
      .navigate().toSearchPage2()
      .pagination().storeListingsIDs((error, listingsId2) => {
        client.verify.equal(0, intersection(listingsId1, listingsId2).length,
          `Listings included in both pages has intersections:${intersection(listingsId1, listingsId2).length}`);
      });
  });
}

function propertyCountAgainstNumberOfListingsCheck(client) {
  client.page.pagination().returnPropertyCount((err, propertyCount) => {
    client.page.pagination().returnTheNumberOfListingsPerPage((error, listingsSumArr) => {
      const totalListings = listingsSumArr.reduce((number1, number2) => number1 + number2, 0);
      client.verify.equal(propertyCount, totalListings,
        `The properties count on the page displays:${propertyCount}
          but the number of listings displayed:${totalListings}`);
    });
  });
}

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    pagination = client.page.pagination();
    navigate = client.page.navigate();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPage();
  },

  'Search page should display paginator bar, pages and buttons': (client) => {
    pagination.click('@footerPartners');
    paginatorBarUICheck(client);
  },

  'Search page should display page numbers at the bottom of the page': (client) => {
    pageNumbersCheck(client);
  },

  'Search page should display first page button selected by Default': () => {
    pagination
      .verify.cssClassPresent('@firstPage', 'is-current')
      .verify.cssClassNotPresent('@secondPage', 'is-current');
  },

  'Should be able to navigate to next Page': (client) => {
    navigate.toSearchPage();
    navigateToNextPageCheck(client);
  },

  'Should be able to navigate back': (client) => {
    navigate.toSearchPage();
    navigateBackCheck(client);
  },

  'Search page should display prev or next button as disabled when reaching last or first page': (client) => {
    navigate.toSearchPage();
    prevNextCheck(client);
  },

  'Search page should restrict user when navigate outside the page limits': (client) => {
    navigateOutsidePageLimitsCheck(client);
  },

  'Search page should display different listings from page 1 to page 2': (client) => {
    navigate.toSearchPage();
    differentListingsOnDifferentPagesCheck(client);
  },

  'Search page should display a properties count that matches the number of listings displayed': (client) => {
    navigate.toSearchPage();
    propertyCountAgainstNumberOfListingsCheck(client);
  },

  after: (client) => {
    client.end();
  },
};
