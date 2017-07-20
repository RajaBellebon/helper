const selectMenuOuterSelector = '.Select-menu-outer';
const searchSortSelector = '.search-results__sort-by-filter';
const sortFeaturedSelector = '.Select-option:nth-child(1)';
const sortNewestSelector = '.Select-option:nth-child(2)';
const sortLowPriceSelector = '.Select-option:nth-child(3)';
const sortHighPriceSelector = '.Select-option:nth-child(4)';
const sortEarlyInspSelector = '.Select-option:nth-child(5)';
const sortSuburbSelector = '.Select-option:nth-child(6)';
const firstpremiumPlusSelector = '.search-results__listing .listing-result__standard-premium';
const firstpPEliteSelector = '.listing-result__standard-pp .listing-result__agent';
const firstpPStandardSelector = '.listing-result__standard-pp';
const firstEliteSelector = '.listing-result__standard-standard';
const firstStandardSelector = '.listing-result__standard-standard.is-no-brand';
const firstStandardProjectSelector = '.listing-result__standard-project';
const firstPremiumProjectSelector = '.listing-result__standard-project';
const childListingSelector = '.listing-result__project-sub';
const listingsPageWrapSelector = '#heroWrap';
const topSpotListingSelector = '.listing-result__topspot';

module.exports = {
  elements: {
    agencyPageBanner: '.agency-hero-content__inner',
    breadcrumbs: '.breadcrumbs',
    crumbs: '.breadcrumbs__crumb',
    childListingDescription: '#description',
    firstPremiumPlusBeadell: '.search-results__listing:nth-child(3) .listing-result__standard-premium',
    listingAddress: '.listing-result__address',
    googleMap: '.angular-google-map',
    mediaBanner: '.media-banner',
    mediaGallery: '.media-gallery',
    mobilegallery: '.slider-wrap',
    premiumPlusListing: '.listing-result__standard-premium',
    productType: '[name="product-type"]',
    ppListing: '.listing-result__standard-pp',
    standardListing: '.listing-result__standard-standard',
    searchToolBar: '.search-results__toolbar',
    selectOptions: '.Select-option',
    searchResults: '.search-results__listing',
    searchList: '.search-results__button-switch:nth-child(1)',
    searchListIcon: '.search-results__button-switch:nth-child(1) .search-results__button-icon',
    searchListText: '.search-results__button-switch:nth-child(1) .search-results__button-label',
    searchMap: '.search-results__button-switch:nth-child(2)',
    searchMapIcon: '.search-results__button-switch:nth-child(2) .search-results__button-icon',
    searchMapText: '.search-results__button-switch:nth-child(2) .search-results__button-label',
    searchSort: searchSortSelector,
    searchResultTopSpot: '.search-results__topspot',
    sortDefaultValue: '.Select-value-label',
    topSpotFeaturedAgency: '.search-results__featured-agent',
    topSpotFeaturedAgencyText: '.search-results__featured-agent-text',
    topSpotFeaturedAgencyLogo: '.search-results__featured-agent-logo',
    topSpotFeaturedText: '.listing-result__featured-text',
    topSpotFeaturedTopSpotIndicator: '.listing-result__topspot-indicator',
    topSpotFeaturedButton: '.listing-result__topspot-button',
    topSpotFeaturedCarousel: '.listing-result__topspot-carousel',
    topSpotSlickSlide: '.slick-side',
    project: firstPremiumProjectSelector,
    projectChildListing: childListingSelector,
  },
  commands: [{
    waitForSearchSortVisible() {
      this.waitForElementVisible(searchSortSelector, 5000);
      return this;
    },
    waitForListingPageWrapVisible() {
      this.waitForElementVisible(listingsPageWrapSelector, 60000);
      return this;
    },
    navigateToTopSpot() {
      this
       .waitForSearchSortVisible()
       .click(topSpotListingSelector);
       // .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstPremiumPlus() {
      this
       .waitForSearchSortVisible()
       .getAndClickOntheFirstElement(firstpremiumPlusSelector);
       // .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstPPElite() {
      this
       .waitForSearchSortVisible()
       .click(firstpPEliteSelector)
       .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstPPStandard() {
      this
       .waitForSearchSortVisible()
       .getAndClickOntheFirstElement(firstpPStandardSelector)
       .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstElite() {
      this
       .waitForSearchSortVisible()
       .getAndClickOntheFirstElement(firstEliteSelector)
       .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstStandard() {
      this
       .waitForSearchSortVisible()
        .getAndClickOntheFirstElement(firstStandardSelector)
       .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstPremiumProject() {
      this
       .waitForSearchSortVisible()
       .click(firstPremiumProjectSelector);
       // .waitForListingPageWrapVisible();
      return this;
    },
    navigateToFirstStandardProject() {
      this
       .waitForSearchSortVisible()
       .click(firstStandardProjectSelector)
       .waitForListingPageWrapVisible();
      return this;
    },
    navigateToProjectChildListing() {
      this
       .waitForSearchSortVisible()
       .click(childListingSelector);
       // .waitForListingPageWrapVisible();
      return this;
    },
    changeSortFiltersTo(sortOptions) {
      this
       .waitForSearchSortVisible()
       .click(searchSortSelector)
       .waitForElementVisible(selectMenuOuterSelector, 10000);
      switch (sortOptions) {
        case 'Featured':
          this.click(sortFeaturedSelector);
          break;
        case 'Newest':
          this.click(sortNewestSelector);
          break;
        case 'Lowest price':
          this.click(sortLowPriceSelector);
          break;
        case 'Highest price':
          this.click(sortHighPriceSelector);
          break;
        case 'Earliest inspection':
          this.click(sortEarlyInspSelector);
          break;
        case 'Suburb':
          this.click(sortSuburbSelector);
          break;
        default:
          break;
      }
      return this;
    },
    getAndClickOntheFirstElement(cssSelector) {
      this.api.page.core().getElements(cssSelector, (err, css) => {
        this.api.elementIdClick(css[0].ELEMENT);
      });
      return this;
    },
  }],
};
