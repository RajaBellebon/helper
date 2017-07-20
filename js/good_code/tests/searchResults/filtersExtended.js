const selectors = require('../../pages/filters').elements;
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;
const expectedPriceMin = expected.default.searchMoreOptions.optionsPriceMin;
const expectedPriceMax = expected.default.searchMoreOptions.optionsPriceMax;
const expectedPriceMinRent = expected.default.searchMoreOptions.optionsPriceMinRent;
const expectedPriceMaxRent = expected.default.searchMoreOptions.optionsPriceMaxRent;
// Code is commented due to https://github.com/domain-group/fe-server-search-results/issues/271
// const expectedSearchMoreOptions = expected.default.searchMoreOptions.optionsProperty;
// const expectedSearchMoreOptionsFeatures = expected.default.searchMoreOptions.optionsFeatures;

let filters;
let navigate;
let priceArray;

// function propertyTypeCheck(client) {
//   client.page.core().getElements(selectors.propertyTypesText, (err, elements) => {
//     client.verify.equal(expectedSearchMoreOptions.types.length, elements.length,
//       (`The current number of navigation options in More dropdown: ${elements.length}`));
//     elements.forEach((propertyTypes, idx) => {
//       client.page.core().getElementIdText(propertyTypes.ELEMENT, (error, propertyTypeLabel) => {
//         client.verify.equal(
//           expectedSearchMoreOptions.types[idx],
//           propertyTypeLabel,
//           `Property type option expected:${expectedSearchMoreOptions.types[idx]}, got:${propertyTypeLabel}`
//         );
//       });
//     });
//   });
// }

function priceFiltersCheck(client, priceOption, expectedOptions) {
  client.page.core().getElementText(selectors.selectMenuOuter, (err, dropdownValues) => {
    priceArray = dropdownValues.split('\n');
    expectedOptions.forEach((option, idx) => {
      client.verify.equal(option, priceArray[idx],
        `For this ${priceOption} price option expected:${option}, got:${priceArray[idx]}`);
    });
  });
}

// function subTypesLengthAndTextCheck(client, propertyType, expectType, subTypesTitle) {
//   client.expect.element(selectors.subTypesTitle).text.to.equal(subTypesTitle);
//   client.page.core().getElements(selectors.singleFiltersCheckBoxes, (err, elements) => {
//     client.verify.equal(expectType.length, elements.length,
//       (`The current number of sub-types options in ${propertyType} sub-types is: ${elements.length}`));
//     elements.forEach((check) => {
//       client.verify.cssClassPresent(selectors.singleCheckBoxes, 'is-checked');
//       client.page.core().getElementIdText(check.ELEMENT, (error, subTypeLabel) => {
//         client.verify.equal(
//           expectType.includes(
//             subTypeLabel.replace('\nSee more information', '')
//           ), true,
//           `More ${propertyType} sub types filters found on page:
//              ${subTypeLabel.replace('\nSee more information', '')}`
//         );
//       });
//     });
//   });
// }

// function subTypesTitleCheck(client, propertyType, titleCheck) {
//   client.page.core().getElementText(selectors.infoTitle, (err, title) => {
//     client.verify.equal(
//       title, titleCheck,
//       `The text title for ${propertyType} sub-types expected: ${titleCheck} got:${title}`
//     );
//   });
// }

// function subTypesSummaryCheck(client, propertyType, summaryCheck) {
//   client.page.core().getElementText(selectors.infoSummary, (err, summary) => {
//     client.verify.equal(
//       summary, summaryCheck,
//       `The text description for ${propertyType} sub-types expected:${summaryCheck} got:${summary}`
//     );
//   });
// }

// function subTypesIconAndImagesCheck(client, expectType, propertyType, expectTypeImg, expectTypeTxt) {
//   client.page.core().getElements(selectors.infoIcon, (err, elements) => {
//     client.verify.equal(expectType.length, elements.length,
//       (`The current number of sub-types information icons in ${propertyType} sub-types is: ${elements.length}`));
//     elements.forEach((check, idx) => {
//       client.elementIdClick(check.ELEMENT);
//       client.waitForElementVisible(selectors.infoWindow, 2000);
//       client.verify.attributeContains(selectors.infoImg,
//         'src',
//         `domain-group/fe-co-search-filters/static/${expectTypeImg[idx]}`);
//       subTypesTitleCheck(client, propertyType, expectType[idx]);
//       subTypesSummaryCheck(client, propertyType, expectTypeTxt[idx]);
//     });
//   });
// }

// function propertySubTypesCheck(client, propertyType, subTypesTitle, expectType, expectTypeImg, expectTypeTxt) {
//   subTypesLengthAndTextCheck(client, propertyType, expectType, subTypesTitle);
//   subTypesIconAndImagesCheck(client, expectType, propertyType, expectTypeImg, expectTypeTxt);
// }

// function featuresOptionsCheck(client, expectedOptions) {
//   client.page.core().getElements(selectors.featuresCheckBoxText, (err, featuresTexts) => {
//     client.verify.equal(expectedOptions.length, featuresTexts.length);
//     featuresTexts.forEach((featureText, idx) => {
//       client.page.core().getElementIdText(featureText.ELEMENT, (error, optionText) => {
//         client.verify.equal(
//           expectedOptions[idx], optionText,
//           `Features options expected:${expectedOptions[idx]} , got:${optionText}`
//         );
//       });
//     });
//   });
// }

function verifyBasicFiltersSaved(client, arrCheck) {
  const selectCheck = [
    selectors.locationValue, selectors.priceMin, selectors.priceMax,
    selectors.propertyTypesValues, selectors.bedRoomValue, selectors.bathRoomValue,
    selectors.parkingValue,
  ];
  selectCheck.forEach((check, idx) => {
    client.page.core().getElementText(check, (err, filter) => {
      client.verify.equal(filter.replace('\n', '').trim(), arrCheck[idx]);
    });
  });
}

function locationSearchDefaultValueCheck(client) {
  client
    .verify.visible(selectors.searchFilters)
    .verify.visible(selectors.placeHolder)
    .verify.visible(selectors.checkBoxLabeltext)
    .expect.element(selectors.locationLabel).text.to.equal('Location');
  client.expect.element(selectors.placeHolder).text.to.equal('Search by suburb, region, postcode or address');
  client.expect.element(selectors.checkBoxLabeltext).text.to.equal('Surrounding suburbs');
}

function filtersPriceCheck(client, expected1, expected2) {

  client
    .click(selectors.priceMin)
    .verify.visible(selectors.selectMenuOuter);
  priceFiltersCheck(client, 'min', expected1);
  client
    .click(selectors.priceMax)
    .verify.visible(selectors.selectMenuOuter);
  priceFiltersCheck(client, 'max', expected2);
}
// function filtersPropertyTypesDefaultValueCheck(client, cssDevice) {
//   client
//     .verify.visible(selectors.searchFiltersDesktop)
//     .page.core().getElementText(`${cssDevice} ${selectors.propertyTypes}`, (propertyTypesText) => {
//       client.verify.equal(propertyTypesText, 'Property types\nAny');
//     })
//     .click(selectors.propertyTypes);
//   propertyTypeCheck(client);
//   client.click(selectors.propertyTypes);
// }

// function propertyTypesOptionsCheck(client, propertyType, subTypes, exp1, exp2, exp3, exp4, exp5) {
//   client
//     .click(selectors.propertyTypes)
//     .page.filters().waitForElementOpenIsVisible()
//     .click(propertyType)
//     .verify.cssClassPresent(propertyType, 'is-checked')
//     .click(subTypes);
//   propertySubTypesCheck(client, exp1, exp2, exp3, exp4, exp5);

//   client
//     .click(propertyType)
//     .verify.cssClassNotPresent(propertyType, 'is-checked')
//     .click(selectors.propertyTypes);
// }

// function bedBathCarCheck(client, css, text1, text2) {
//   client.expect.element(css).text.to.equal(text1);
//   client
//     .click(css)
//     .page.filters().waitForElementOpenIsVisible()
//     .expect.element(css).text.to.equal(text2);
//   client.click(css);
// }

// function moreOptionsDefaultValueCheck(client, css, exp) {
//   client
//     .click(selectors.moreOptions)
//     .page.filters().waitForElementOpenIsVisible()
//     .page.core().getElementText(css, (text) => {
//       client.verify.equal(text, exp);
//     })
//     .click(selectors.features);
// }

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    filters = client.page.filters();
    navigate = client.page.navigate();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPageSale();
  },

  'Check filters default value and options for Location': (client) => {
    locationSearchDefaultValueCheck(client);
  },

  'Check filters default value and options for Price - Sale': (client) => {
    filters
      .verify.visible('@priceFiltersContainer')
      .expect.element('@priceLabel').text.to.equal('Price');
    filters.expect.element('@priceMin').text.to.equal('Any');
    filters.expect.element('@priceMax').text.to.equal('Any');
    filtersPriceCheck(client, expectedPriceMin, expectedPriceMax);
  },

  'Check filters default value and options for Price - Rent': (client) => {
    navigate.toSearchPageRent();
    filtersPriceCheck(client, expectedPriceMinRent, expectedPriceMaxRent);
  },


  'All Tests related to property types and filters will fail because of a bug #271': () => {
    // 'https://github.com/domain-group/fe-server-search-results/issues/271');
  },

  // 'Check filters default value and options for Property Types': (client) => {
  //   navigate.toSearchPageSale();
  //   filtersPropertyTypesDefaultValueCheck(client, selectors.desktop);
  // },

  // Tests are commented due to https://github.com/domain-group/fe-server-search-results/issues/271
  // 'Check filters default value and options for Property Types - House': (client) => {
  //   propertyTypesOptionsCheck(
  //     client, selectors.house, selectors.houseArrow,
  //     'House', 'House sub-types',
  //     expectedSearchMoreOptions.optionsHouse,
  //     expectedSearchMoreOptions.optionsHouseImg,
  //     expectedSearchMoreOptions.optionsHouseText
  //   );
  // },

  // 'Check filters default value and options for Property Types - Apartment': (client) => {
  //   propertyTypesOptionsCheck(
  //     client, selectors.apartment, selectors.apartmentArrow,
  //     'Apartment', 'Apartment sub-types',
  //     expectedSearchMoreOptions.optionsApartment,
  //     expectedSearchMoreOptions.optionsApartmentImg,
  //     expectedSearchMoreOptions.optionsApartmentText
  //   );
  // },

  // 'Check filters default value and options for Property Types - Rural': (client) => {
  //   propertyTypesOptionsCheck(
  //     client, selectors.rural, selectors.ruralArrow,
  //     'Rural', 'Rural sub-types',
  //     expectedSearchMoreOptions.optionsRural,
  //     expectedSearchMoreOptions.optionsRuralImg,
  //     expectedSearchMoreOptions.optionsRuralText
  //   );
  // },

  // 'Check filters default value and options for Property Types - New Development': (client) => {
  //   propertyTypesOptionsCheck(
  //     client, selectors.newDev, selectors.newDevArrow,
  //     'New Developments', 'New Developments sub-types',
  //     expectedSearchMoreOptions.optionsNewDev,
  //     expectedSearchMoreOptions.optionsNewDevImg,
  //     expectedSearchMoreOptions.optionsNewDevText
  //   );
  // },

  // 'Check filters default value and options for Property Types - Land': () => {
  //   filters
  //     .click(selectors.propertyTypes)
  //     .waitForElementOpenIsVisible()
  //     .click('@land')
  //     .verify.cssClassPresent('@land', 'is-checked')
  //     .click('@land')
  //     .verify.cssClassNotPresent('@land', 'is-checked')
  //     .click(selectors.propertyTypes);
  // },

  // 'Check filters default value and options for Bedrooms': (client) => {
  //   bedBathCarCheck(
  //     client, selectors.bedRoomsFilter,
  //     'Bedrooms\nAny', 'Bedrooms\nAny Bedrooms\nS\n1\n2\n3\n4\n5+'
  //   );
  // },

  // 'Check filters default value and options for Bathrooms': (client) => {
  //   bedBathCarCheck(
  //     client, selectors.bathRoomsFilter,
  //     'Bathrooms\nAny', 'Bathrooms\nAny Bathrooms\n0\n1\n2\n3\n4\n5+'
  //   );
  // },
  // 'Check filters default value and options for Parking': (client) => {
  //   bedBathCarCheck(
  //     client, selectors.parkingFilter,
  //     'Parking\nAny', 'Parking\nAny Parking\n0\n1\n2\n3\n4\n5+'
  //   );
  // },

  // 'Check filters default value and options for More Options': (client) => {
  //   client
  //     .page.core().getElementText(selectors.moreOptions, (moreOptionsText) => {
  //       client.verify.equal(moreOptionsText, 'More options');
  //     })
  //     .click(selectors.moreOptions)
  //     .page.filters().waitForElementOpenIsVisible()
  //     .click(selectors.moreOptions);
  // },

  // 'Check filters default value and options for Features': (client) => {
  //   moreOptionsDefaultValueCheck(client, selectors.features, 'Features\nAny');
  //   filters.verify.cssClassPresent('@featuresAllCheckBoxes', 'is-checked');
  //   featuresOptionsCheck(client, expectedSearchMoreOptionsFeatures);
  //   filters
  //     .click(selectors.features)
  //     .click(selectors.moreOptions);
  // },

  // 'Check filters default value and options for Land size': (client) => {
  //   moreOptionsDefaultValueCheck(client, selectors.landSize, 'Land size\nAny');
  //   filters
  //     .waitForElementVisible('@landSizeContainer', 2000)
  //     .expect.element('@landSizeContainer').text.to.contain('From\nm2\n- To\nm2');
  //   filters
  //     .click(selectors.landSize)
  //     .click(selectors.moreOptions);
  // },

  // 'Check filters default value and options for Keywords': (client) => {
  //   moreOptionsDefaultValueCheck(client, selectors.keyWords, 'Keywords');
  //   client
  //     .click(selectors.keyWords)
  //     .page.core().getElementText(selectors.keyWordsLabel, (keyWordsText) => {
  //       client.verify.equal(keyWordsText, 'eg: waterfront, views, street name');
  //     })
  //     .verify.visible(selectors.keyWordsInput);
  // },

  'On the search page for Sold, the filters should display the search values': (client) => {
    navigate.toSearchPageWithBasicFiltersSold();
    // 'https://github.com/domain-group/fe-server-search-results/issues/337';
    verifyBasicFiltersSaved(client, ['Sydney Region, NSW', '$200,000', 'Any',
      'Duplex, Semi detached, Terrace, Townhouse, Villa', '3', '2', '1']);
    filters
      .click('@bedRoomsFilter')
      .verify.elementPresent('@numberOfresults');
  },

  'On the search page for Rent, the filters should display the search values': (client) => {
    navigate.toSearchPageWithBasicFiltersRent();
    // 'https://github.com/domain-group/fe-server-search-results/issues/337';
    verifyBasicFiltersSaved(client, ['Sydney Region, NSW', '$200,000', 'Any',
      'Duplex, Semi detached, Terrace, Townhouse, Villa', '3', '2', '1']);
    filters
      .click('@bedRoomsFilter')
      .verify.elementPresent('@numberOfresults');
  },

  'On the search page for Share, the filters should display the search values': (client) => {
    navigate.toSearchPageWithBasicFiltersShare();
    // 'https://github.com/domain-group/fe-server-search-results/issues/337';
    verifyBasicFiltersSaved(client, ['Sydney Region, NSW', '$200,000', 'Any',
      'Duplex, Semi detached, Terrace, Townhouse, Villa', '3', '2', '1']);
    filters
      .click('@bedRoomsFilter')
      .verify.elementPresent('@numberOfresults');
  },

  'On the search page, Saved search in the Search Results page': () => {
    filters.verify.visible('@savedSearchBtn');
  },

  'When users update his filters, they should be able to save his filters': () => {
    // TODO later once the saved search is implemented
  },

  after: (client) => {
    client.end();
  },
};

