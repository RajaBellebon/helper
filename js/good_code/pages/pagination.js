const paginationItemSelector = '.paginator__page-button';
const listingsSelector = '.listing-result';
const searchResultsSummary = '.search-results__summary';
const searchResultsSelector = '.search-results__listing';
const isProjectSelector = '.is-project';
const childListingSelector = '.listing-result__project-sub';

let count = null;
let lastPage = null;

module.exports = {
  elements: {
    container: '.search-results__container',
    firstPage: '.paginator__page-button:nth-child(1)',
    footerPartners: '.footer-partners',
    paginationBar: '.paginator',
    pages: '.paginator__pages',
    secondPage: '.paginator__page-button:nth-child(2)',
    noResult: '.search-results__no-match-result-heading',
    navigationButton: '.button__outline:nth-child',
    next: '.paginator .is-outline:nth-child(3)',
    prev: '.paginator .is-outline:nth-child(1)',
    listings: listingsSelector,
  },
  commands: [{
    clickNextPage() {
      this
        .click('@next')
        .waitForElementNotVisible('@next', 30000)
        .waitForElementPresent('@next', 30000);
      return this;
    },
    clickPreviousPage() {
      this
        .click('@prev')
        .waitForElementNotPresent('@prev', this.api.globals.default.waitForConditionTimeout)
        .waitForElementPresent('@prev', this.api.globals.default.waitForConditionTimeout);
      return this;
    },
    clickLastPage() {
      this
        .waitForElementVisible('@next', 5000)
        .api.page.core().getElements(paginationItemSelector, (err, pages) => {
          pages.forEach((page, idx) => {
            if (idx === pages.length - 1) {
              this.api.elementIdClick(pages[idx].ELEMENT);
            }
          });
        });
      return this;
    },
    returnLastPage(callback) {
      this
        .waitForElementVisible('@next', 5000)
        .api.page.core().getElements(paginationItemSelector, (err, pages) => {
          lastPage = pages.length;
          callback(null, lastPage);
        });
      return lastPage;
    },
    returnPropertyCount(callback) {
      this
        .waitForElementVisible(searchResultsSummary, 5000)
        .api.page.core().getElementText(searchResultsSummary, (err, textCount) => {
          count = textCount.split('Properties');
          count = parseInt(count[0].trim(), 10);
          callback(null, count);
        });
      return count;
    },
    storeListingsIDs(callback) {
      this
        .waitForElementVisible('@next', 5000)
        .api.page.core().getElements(listingsSelector, (err, listings) => {
          const listingsArray = [];
          listings.forEach((listing, idx) => {
            this.api.page.core().getAttributeText(
              `${searchResultsSelector}:nth-child(${idx + 1}) ${listingsSelector}`,
              'data-listing-id', (err1, listingId) => {
                if (listingId !== null) {
                  listingsArray.push(listingId);
                }
                if (idx === listings.length - 1) {
                  callback(null, listingsArray);
                }
              });
          });
        });
      return this;
    },
    returnTheNumberOfListingsPerPage(callback) {
      this.api.page.core().getElements(paginationItemSelector, (err1, pages) => {
        const numberOfListings = [];
        pages.forEach((page, idx) => {
          // First start storing listings IDs + project IDs
          this.storeListingsIDs((err, listingsId) => {
            numberOfListings.push(listingsId.length);
            // If there is a project, the re are child listings that have to be stored too
            this.returnProjectChildListings((error, childListingsId) => {
              numberOfListings.push(childListingsId.length);
            });
            if (idx === pages.length - 1) {
              callback(null, numberOfListings);
            }
          });
          this.clickNextPage();
        });
      });
      return this;
    },
    returnProjectChildListings(callback) {
      let childListingsArray = [];
      this.api.element(isProjectSelector, (childListing) => {
        if (childListing.status === -1) {
          childListingsArray = [];
        } else {
          this.api.page.core().getElements(childListingSelector, (err, childListings) => {
            childListings.forEach((child, idx) => {
              this.api.page.core()
                .getAttributeText(`${childListingSelector}:nth-child(${idx + 1})`, 'data-listing-id', (listingId) => {
                  if (listingId !== null) {
                    childListingsArray.push(listingId);
                  }
                  if (idx === childListings.length - 1) {
                    callback(null, childListingsArray);
                  }
                });
            });
          });
        }
      });
      return this;
    },
  }],
};
