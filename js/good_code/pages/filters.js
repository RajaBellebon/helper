const globals = require('../nightwatch.globals.js').default;

const desktopSelector = '.search-filters__features-desktop';
const mobileSelector = '.search-filters__features-mobile';

const featuresCheckBoxTextSelector =
  '.search-filters__features-desktop .search-filters__half-col .domain-checkbox__label';
const featuresSelector =
  '.search-filters__features-desktop div:nth-child(5) .search-filters__collapse-field:nth-child(1)';
const firstOptionsSelector = '.Select-option:nth-child(3)';
const isOpenSelector = '.is-open';
const keyWordsSelector =
  '.search-filters__features-desktop div:nth-child(5) .search-filters__collapse-field:nth-child(3)';
const landSizeSelector =
  '.search-filters__features-desktop div:nth-child(5) .search-filters__collapse-field:nth-child(2)';
const locationValueSelector = '#react-select-locations-typeahead--value-0';
const locationInputSelector = 'input[role="combobox"]';
const moreOptionsSelector = '.search-filters__features-desktop > div:nth-child(5)';
const propertyTypesSelector = '.search-filters__collapse-field:nth-child(1)';
const selectSearchTypeSelector = '.Select-option';
const selectMenuOuterSelector = '.Select-menu-outer';
const firstListing = '.search-results__listing:nth-child(2)';
const body = 'body';

module.exports = {
  elements: {
    apartment: '.search-filters__features-desktop .checkbox-subfilters:nth-child(3) .domain-checkbox',
    apartmentArrow: '.search-filters__features-desktop .checkbox-subfilters:nth-child(3) .checkbox-subfilters__arrow',
    bathRoomValue:
    '.search-filters__features-desktop > div:nth-child(3) > button > span.search-filters__collapse-value',
    bathRoomValue_mob:
    '.search-filters__features-mobile > div:nth-child(3) > button > span.search-filters__collapse-value',
    bathRoom0: '.search-filters__features-desktop #filter-Bathrooms-0 + .range-selector__link',
    bathRoom1: '.search-filters__features-desktop #filter-Bathrooms-1 + .range-selector__link',
    bathRooms2: '.search-filters__features-desktop #filter-Bathrooms-2 + .range-selector__link',
    bathRooms2_mob: '.search-filters__features-mobile #filter-Bathrooms-2 + .range-selector__link',
    bathRooms3: '.search-filters__features-desktop #filter-Bathrooms-3 + .range-selector__link',
    bathRooms4: '.search-filters__features-desktop #filter-Bathrooms-4 + .range-selector__link',
    bathRooms5: '.search-filters__features-desktop #filter-Bathrooms-5 + .range-selector__link',
    bathRooms5_mob: '.search-filters__features-mobile #filter-Bathrooms-5 + .range-selector__link',
    bedRoomValue:
    '.search-filters__features-desktop > div:nth-child(2) > button > span.search-filters__collapse-value',
    bedRoomValue_mob:
    '.search-filters__features-mobile > div:nth-child(2) > button > span.search-filters__collapse-value',
    bedRoomstudio: '.search-filters__features-desktop #filter-Bedrooms-0  + .range-selector__link',
    bedRoom1: '.search-filters__features-desktop #filter-Bedrooms-1  + .range-selector__link',
    bedRoom1_mob: '.search-filters__features-mobile #filter-Bedrooms-1  + .range-selector__link',
    bedRooms2: '.search-filters__features-desktop #filter-Bedrooms-2  + .range-selector__link',
    bedRooms3: '.search-filters__features-desktop #filter-Bedrooms-3  + .range-selector__link',
    bedRooms4: '.search-filters__features-desktop #filter-Bedrooms-4  + .range-selector__link',
    bedRooms4_mob: '.search-filters__features-mobile #filter-Bedrooms-4  + .range-selector__link',
    bedRooms5: '.search-filters__features-desktop #filter-Bedrooms-5  + .range-selector__link',
    checkBoxLabeltext: '.domain-checkbox__label-text',
    domainCheckBoxes: '.domain-checkbox',
    bathRoomsFilter: '.search-filters__collapse-field:nth-child(3)',
    bedRoomsFilter: '.search-filters__collapse-field:nth-child(2)',
    desktop: desktopSelector,
    mobile: mobileSelector,
    mobileFilterBtn: '.search-results__filter-button',
    featuresAllCheckBoxes: '.search-filters__features-desktop .search-filters__half-col:nth-child(1)',
    filterLabel: '.form-group-wrapper__label',
    firstResult: firstListing,
    isSelected: '.is-selected',
    isChecked: '.is-checked',
    isExpanded: '.is-expanded',
    infoIcon: '.checkbox-subfilters__info-icon',
    infoWindow: '.checkbox-subfilters__info-window',
    infoImg: '.checkbox-subfilters__info-img',
    infoTitle: '.checkbox-subfilters__info-title',
    infoSummary: '.checkbox-subfilters__info-summary',
    house: '.search-filters__features-desktop .checkbox-subfilters:nth-child(1) .domain-checkbox',
    houseArrow: '.search-filters__features-desktop .checkbox-subfilters:nth-child(1) .checkbox-subfilters__arrow',
    keyWords: keyWordsSelector,
    keyWordsInput: '[name="keywords"]',
    keyWordsLabel:
    '[class$=desktop] div:nth-child(5) .search-filters__collapse-field:nth-child(3) .form-group-wrapper__label',
    land: '.search-filters__features-desktop .checkbox-subfilters:nth-child(2) .domain-checkbox',
    landSizeMin: '[name="minSize"]',
    landSizeMax: '[name="maxSize"]',
    landSizeContainer: '.search-filters__features-desktop .search-filters__land-container',
    locationLabel: '.search-filters__columns:nth-child(1) .search-filters__column-left',
    locationValue: locationValueSelector,
    newDev: '.search-filters__features-desktop .checkbox-subfilters:nth-child(5) .domain-checkbox',
    newDevArrow: '.search-filters__features-desktop .checkbox-subfilters:nth-child(5) .checkbox-subfilters__arrow',
    numberOfresults: '.range-selector__label',
    priceLabel: '.search-filters__columns:nth-child(2) .search-filters__column-left',
    priceFiltersContainer: '.search-filters__price-container',
    parkingFilter: '.search-filters__collapse-field:nth-child(4)',
    placeHolder: '.Select-placeholder',
    priceMin: '#react-select-2--value-item',
    pMin50K: '#react-select-2--option-1',
    priceMax: '#react-select-3--value-item',
    price2M: '#react-select-3--option-30',
    parkingValue:
    '.search-filters__features-desktop > div:nth-child(4) > button > span.search-filters__collapse-value',
    parkingValue_mob:
    '.search-filters__features-mobile > div:nth-child(4) > button > span.search-filters__collapse-value',
    parking0: '.search-filters__features-desktop #filter-Parking-0  + .range-selector__link',
    parking1: '.search-filters__features-desktop #filter-Parking-1  + .range-selector__link',
    parking1_mob: '.search-filters__features-mobile #filter-Parking-1  + .range-selector__link',
    parkings2: '.search-filters__features-desktop #filter-Parking-2  + .range-selector__link',
    parkings3: '.search-filters__features-desktop #filter-Parking-3  + .range-selector__link',
    parkings3_mob: '.search-filters__features-mobile #filter-Parking-3  + .range-selector__link',
    parkings4: '.search-filters__features-desktop #filter-Parking-4  + .range-selector__link',
    parkings5: '.search-filters__features-desktop #filter-Parking-5  + .range-selector__link',
    propertyFilterDropDown: '.domain-multi-select__selectmenu-dropdown',
    propertyTypesText: '.search-filters__features-desktop .checkbox-subfilters__label',
    propertyTypesValues:
    '.search-filters__features-desktop > div:nth-child(1) > button > span.search-filters__collapse-value',
    propertyTypesValues_mob:
    '.search-filters__features-mobile > div:nth-child(1) > button > span.search-filters__collapse-value',
    propertyTypes: propertyTypesSelector,
    removeLocation: '.Select-value-icon',
    rural: '.search-filters__features-desktop .checkbox-subfilters:nth-child(4) .domain-checkbox',
    ruralArrow: '.search-filters__features-desktop .checkbox-subfilters:nth-child(4) .checkbox-subfilters__arrow',
    savedSearchBtn: '.search-filters__save-search',
    selectValue: '.Select-value',
    selectInput: locationValueSelector,
    selectMenuOuter: selectMenuOuterSelector,
    searchButton: '.search-filters__submit',
    searchAutoComplete: '.SearchAutoComplete',
    searchBoxOptions: '.search-box__search-options',
    searchArrow: '.Select-arrow-zone',
    searchFilters: '.search-filters',
    searchFiltersDesktop: '.search-filters__features-desktop',
    selectOptions: '.Select-option',
    singleFiltersCheckBoxes: '.checkbox-subfilters__single-filter',
    singleCheckBoxes: '.checkbox-subfilters__single-filter .domain-checkbox',
    subTypes: '.checkbox-subfilters__popup-title',
    toggleOptions: '.search-box__toggle-options',
  },
  commands: [{
    locationSearch(location) {
      this
        .click(locationInputSelector)
        .setValue(locationInputSelector, location)
        .waitForElementVisible(selectMenuOuterSelector, globals.waitForConditionTimeout)
        .waitForElementVisible(firstOptionsSelector, globals.waitForConditionTimeout)
        .click(firstOptionsSelector)
        .waitForElementNotPresent(selectMenuOuterSelector, globals.waitForConditionTimeout)
        .waitForElementNotPresent('@searchAutoComplete', globals.waitForConditionTimeout);
      return this;
    },
    clearSearch() {
      this
        .waitForElementVisible('@removeLocation', globals.waitForConditionTimeout)
        .click('@removeLocation');
      return this;
    },
    waitForElementOpenIsVisible() {
      this.waitForElementVisible(isOpenSelector, globals.waitForConditionTimeout);
      return this;
    },
    waitForDropDownIsVisible() {
      this.waitForElementVisible(selectMenuOuterSelector, globals.waitForConditionTimeout);
      return this;
    },
    setFilters(range) {
      if (range.length > 1) {
        this
          .click(range[0])
          .click(range[1]);
      } else {
        this.click(range[0]);
      }
      return this;
    },
    selectPrice(price) {
      this.api.page.core().getElements(selectSearchTypeSelector, (err, options) => {
        options.forEach((check) => {
          this.api.page.core().getElementIdText(check.ELEMENT, (error, option) => {
            if (price === option) {
              this.api.elementIdClick(check.ELEMENT);
            }
          });
        });
      });
      return this;
    },
    selectFeatures(featuresOptions) {
      featuresOptions.forEach((feature) => {
        this.api.page.core().getElements(featuresCheckBoxTextSelector, (err, options) => {
          options.forEach((check) => {
            this.api.page.core().getElementIdText(check.ELEMENT, (err1, option) => {
              if (feature === option) {
                this.api.elementIdClick(check.ELEMENT);
              }
            });
          });
        });
      });
      return this;
    },
    updatePropertyType(propertyTypeArr) {
      this
        .click(propertyTypesSelector)
        .waitForElementOpenIsVisible();
      propertyTypeArr.forEach((check, idx) => {
        this
          .waitForElementVisible(propertyTypeArr[idx], globals.waitForConditionTimeout)
          .click(propertyTypeArr[idx])
          .waitForElementPresent(`${propertyTypeArr[idx]}.is-checked`, globals.waitForConditionTimeout);
      });
      return this;
    },
    updatePrice(cssSelector, price) {
      this
        .click(cssSelector)
        .waitForDropDownIsVisible()
        .selectPrice(price);
      return this;
    },
    updatePriceHack(cssSelector, cssSelectorPrice) {
      this
        .click(cssSelector)
        .waitForDropDownIsVisible()
        .click(cssSelectorPrice);
      return this;
    },
    updateFilter(cssSelector, range) {
      this
        .click(cssSelector)
        .waitForElementOpenIsVisible()
        .setFilters(range);
      return this;
    },
    updateFeatures(cssFeaturesOptions) {
      this
        .click(moreOptionsSelector)
        .waitForElementOpenIsVisible()
        .click(featuresSelector)
        .waitForElementOpenIsVisible()
        .selectFeatures(cssFeaturesOptions);
      return this;
    },
    updateLandSize(landSizeMin, landSizeMax) {
      this
        .click(moreOptionsSelector)
        .waitForElementOpenIsVisible()
        .click(landSizeSelector)
        .waitForElementOpenIsVisible()
        .setValue('landSizeMin', landSizeMin)
        .setValue('landSizeMax', landSizeMax);
      return this;
    },
    updateKeyWords(keyWords) {
      this
        .click(moreOptionsSelector)
        .waitForElementOpenIsVisible()
        .click(keyWordsSelector)
        .setValue('@keyWordsInput', keyWords);
    },
    updateFilters(currentBrowser, location, pType, rangeBed, rangeBath, rangeCar, moreOptions) {
      if (['iPhone', 'android'].indexOf(currentBrowser) !== -1) {
        this
          .waitForElementVisible('@mobileFilterBtn', 5000)
          .click('@mobileFilterBtn')
          .waitForElementVisible('@isExpanded', 5000)
          .locationSearch(location)
          .updatePriceHack('@priceMin', '@pMin50K')
          .updatePriceHack('@priceMax', '@price2M')
          .click('@bedRoom1_mob')
          .click('@bedRooms4_mob')
          .click('@bathRooms2_mob')
          .click('@bathRooms5_mob')
          .click('@parking1_mob')
          .click('@parkings3_mob');
      }
      if (['chrome', 'firefox', 'ie', 'safari', 'iPad'].indexOf(currentBrowser) !== -1) {
        this.updateFiltersDesktop(location, pType, rangeBed, rangeBath, rangeCar, moreOptions);
      }
      return this;
    },
    updateFiltersDesktop(location, pType, rangeBed, rangeBath, rangeCar, moreOptions) {
      this
        .locationSearch(location)
        .updatePropertyType(pType)
        .updatePriceHack('@priceMin', '@pMin50K')
        .updatePriceHack('@priceMax', '@price2M')
        .updateFilter('@bedRoomsFilter', rangeBed)
        .updateFilter('@bathRoomsFilter', rangeBath)
        .updateFilter('@parkingFilter', rangeCar);
      if (moreOptions) {
        const { cssFOpt, lSMin, lSMax, keywords } = moreOptions;
        this
          .updateFeatures(cssFOpt)
          .upddateLandSize(lSMin, lSMax)
          .updateKeyWords(keywords);
        //  if several keywords, just seperate them by a comma
      }
      this
        .click('@searchButton')
        .waitForElementVisible(body, globals.waitForConditionTimeout)
        .waitForElementVisible('@removeLocation', 30000);
      return this;
    },
  }],
};
