const listingDetails = require('./listingDetails');

module.exports = {
  elements: {
    elevatorAd: '#elevator-ads-homepage',
    hideAd: '#hideAdButton',
    homePage: '#homepage',
    container: '.search-results__page',
    domainHeadline: '.domain-home__headline',
  },
  commands: [{
    navigateTo(url, elem) {
      this.navigate(url)
        .waitForElementPresent(elem, 20000);
      return this;
    },
    toSearchPage() {
      this.navigateTo(`${this.api.launchUrl}/sale/vaucluse-nsw-2030/`, '@container');
    },
    toSearchPage1() {
      this.navigateTo(`${this.api.launchUrl}/sale/vaucluse-nsw-2030/?page=1`, '@container');
    },
    toSearchPage2() {
      this.navigateTo(`${this.api.launchUrl}/sale/vaucluse-nsw-2030/?page=2`, '@container');
    },
    toSearchPageNumber(pageNumber) {
      this.navigateTo(`${this.api.launchUrl}/sale/vaucluse-nsw-2030/?page=${pageNumber}`, '@container');
    },
    toSearchPageBeadell() {
      this.navigateTo(`${this.api.launchUrl}/sale/beadell-wa-6440/`, '@container');
    },
    toSearchPagePyrmont() {
      this.navigateTo(`${this.api.launchUrl}/sale/pyrmont-nsw-2009/`, '@container');
    },
    toSearchPageCoogee() {
      this.navigateTo(`${this.api.launchUrl}/sale/coogee-nsw-2034/`, '@container');
    },
    toSearchPageFeaturedAgency() {
      this.navigateTo(`${this.api.launchUrl}/sale/woolloomooloo-nsw-2011/?bedrooms=3-any`, '@container');
    },
    toSearchPageSydney() {
      this.navigateTo(`${this.api.launchUrl}/sale/sydney-nsw-2000/`, '@container');
    },
    toSearchPageSydneyPage2() {
      this.navigateTo(`${this.api.launchUrl}/sale/sydney-nsw-2000/?page=2`, '@container');
    },
    toSearchPageNewtown() {
      this.navigateTo(`${this.api.launchUrl}/sale/newtown-nsw-2042/`, '@container');
    },
    toSearchPageMultiSuburbs() {
      this.navigateTo(`${this.api.launchUrl}/sale/?suburb=marrickville-nsw-2204,newtown-nsw-2042`,
        '@container');
    },
    toSearchPageSale() {
      this.navigateTo(`${this.api.launchUrl}/sale/`, '@container');
      console.log(`(!) Navigating to ${this.api.launchUrl}/sale/`);  // eslint-disable-line no-console
    },
    toSearchPageRent() {
      this.navigateTo(`${this.api.launchUrl}/rent/`, '@container');
    },
    toSearchPageSold() {
      this.navigateTo(`${this.api.launchUrl}/sold-listings/`, '@container');
    },
    toSearchPageShare() {
      this.navigateTo(`${this.api.launchUrl}/share/`, '@container');
    },
    toSearchPageWithBasicFilters() {
      this.navigateTo(`${this.api.launchUrl}/sale/?region=sydney-region-nsw` +
        '&ptype=duplex,semi-detached,terrace,town-house,villa&bedrooms=3&bathrooms=2' +
        '&price=200000-any&carspaces=1', '@container');
    },
    toSearchPageWithBasicFiltersRent() {
      this.navigateTo(`${this.api.launchUrl}/rent/sydney-nsw-2000/` +
        '?ptype=duplex,semi-detached,terrace,town-house,villa&bedrooms=3&bathrooms=2' +
        '&price=200-any&carspaces=1', '@container');
    },
    toSearchPageWithBasicFiltersSold() {
      this.navigateTo(`${this.api.launchUrl}/sold-listings/sydney-nsw-2000/` +
        '?ptype=duplex,semi-detached,terrace,town-house,villa&bedrooms=3&bathrooms=2' +
        '&price=200000-any&carspaces=1', '@container');
    },
    toSearchPageWithBasicFiltersShare() {
      this.navigateTo(`${this.api.launchUrl}/share/sydney-nsw-2000/` +
        '?ptype=duplex,semi-detached,terrace,town-house,villa,land&bedrooms=3&bathrooms=2' +
        '&price=200-any&carspaces=1', '@container');
    },
    toSearchPageWithAllFilters() {
      this.navigateTo(`${this.api.launchUrl}/sale/?region=regional-nsw-nsw&ptype=duplex,house,semi-detached,terrace,` +
        'town-house,villa&bedrooms=3&bathrooms=2&price=100000-any&carspaces=2&features=airconditioning' +
        '&landsize=100-any&keywords=views', '@container');
    },
    toListingDetailsProject() {
      this.navigateTo(`${this.api.launchUrl}/project/123/`, `${listingDetails.sections.header.selector}`);
    },
    toListingDetailsListing() {
      this.navigateTo(`${this.api.launchUrl}/123/`, `${listingDetails.sections.header.selector}`);
    },
    goBack() {
      this.api.back();
    },
    removeAd() {
      if (this.api.elementIdDisplayed('@hideAd')) {
        // this is not working as clicking the ad is throwing some error console
        // this.click('@hideAd');
        // For the add
        this.waitForElementVisible('@domainHeadline', 5000);
        this.api.pause(3500);
      }
    },
  }],
};
