const selector = require('../../pages/widget').elements;
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;
const seoHouseExpected = expected.default.seoCards.House;
const seoUnitsExpected = expected.default.seoCards.Units;

let navigate;

function isNumeric(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function seoWidgetUICheckCard(client, cssSelector, cssSelector1, text, text1) {
  client
    .verify.visible(cssSelector)
    .verify.visible(cssSelector1)
    .verify.visible((cssSelector + text + selector.seoCardsFirstRow))
    .verify.visible((cssSelector + text + selector.seoCardsFirstRowsLinks))
    .page.core().getElementText((cssSelector + text + selector.seoCardsHeaders), (err, headerText) => {
      client.verify.equal(headerText, 'BEDS MEDIAN FOR SALE');
    })
    .verify.cssClassPresent((cssSelector + text + selector.seoCardsFirstRow), 'is-clickable')
    .expect.element((cssSelector + text + selector.seoCardsTitles)).text.to.equal(text1);
}

function cardDataBedCheck(client, cssSelector, text, text1, expectedVal) {
  client.page.core().getElements((cssSelector + text + selector.seoCardsRowsLinks), (error, numberOfBeds) => {
    client.verify.notEqual(numberOfBeds.length, 0,
      `The card is expected to have ${expectedVal.length} beds rows but got: ${numberOfBeds.length}`);
    numberOfBeds.forEach((bedTexts, idx) => {
      client.page.core().getElementIdText(bedTexts.ELEMENT, (err1, bedText) => {
        client.verify.equal(bedText, expectedVal[idx],
          `Bed text number expected:${expectedVal[idx]}, but got: ${bedText}`);
      });
      client.page.core().getElementIdAttribute(bedTexts.ELEMENT, 'href', (err, href) => {
        if (href !== null) {
          client.verify.equal(
            (href.includes(text1) ||
              href.includes(expectedVal[idx].replace(' Beds', '-bedrooms').replace(' Bed', '-bedroom'))), true,
            `The link should direct to the proper url:${href})`);
        }
      });
    });
  });
}

function cardDataPriceCheck(client, cssSelector, text, expectedVal) {
  client.page.core().getElements((cssSelector + text + selector.seoCardsRowsLinks), (error, prices) => {
    client.verify.equal(prices.length, expectedVal.length,
      `The card is expected to have ${expectedVal.length} prices rows but got: ${prices.length}`);
    prices.forEach((price) => {
      client.page.core().getElementIdText(price.ELEMENT, (err, median) => {
        client.verify.equal((median.includes('$') ||
          median.includes('k') || median.includes('m') || median.includes('-')), true,
          `Price median text expected a number with numbers but got: ${median}`);
      });
    });
  });
}

function cardDataForSaleCheck(client, cssSelector, text, expectedVal) {
  client.page.core().getElements((cssSelector + text + selector.seoCardsBarGraphs), (error, barGraphs) => {
    client.verify.equal(barGraphs.length, expectedVal.length,
      `The card is expected to have ${expectedVal.length} graphs rows but got: ${barGraphs.length}`);
    barGraphs.forEach((numberOfProperties) => {
      client.page.core().getElementIdText(numberOfProperties.ELEMENT, (err, number) => {
        client.verify.equal(isNumeric(number), true,
          `The number of properties displays in the graph ${number} is a number`);
      });
    });
  });
}

function urlLocationAndPropertiesCheck(client) {
  client
    .click(selector.seoCardsFirstRowClick)
    .verify.urlContains('sale/beadell-wa-6440/house/2-bedrooms/')
    // the line below may be commented as SEO is not sure yet of the title
    .verify.title('1, 2 Bedroom House for sale in Beadell, WA, 6440');
}

function widgetCREUICheck(client) {
  client
    .verify.visible(selector.searchResultsCREWidget)
    .verify.visible(selector.creLink)
    .verify.visible(selector.creLogo)
    .verify.attributeContains(selector.creLink,
    'href', 'commercialrealestate.com.au/for-sale/vaucluse-nsw-2030/')
    .verify.attributeContains(selector.creLogo, 'src', '/logo-cre')
    .expect.element(selector.creLink).text.to.equal('Commercial properties for sale in Vaucluse, NSW 2030');
}

function widgetNotHereCheck(client) {
  client
    .verify.elementNotPresent(selector.searchResultsCREWidget)
    .verify.elementNotPresent(selector.creLink)
    .verify.elementNotPresent(selector.creLogo);
}

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    navigate = client.page.navigate();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPage();
  },

  'On search page, the first seo widgets card should display House and required text': (client) => {
    navigate.toSearchPageNewtown();
    seoWidgetUICheckCard(client, selector.firstCard, selector.seoCardsIconHouse, ' ', 'Houses in Newtown');
  },

  'On search page, the second seo widgets card should display Units and required text': (client) => {
    seoWidgetUICheckCard(client, selector.secondCard, selector.seoCardsIconUnits, ' ', 'Units in Newtown');
  },

  'On search page, the first card should display consistent data': (client) => {
    cardDataBedCheck(client, selector.firstCard, ' a', 'house', seoHouseExpected);
    cardDataPriceCheck(client, selector.firstCard, ' span', seoHouseExpected);
    cardDataForSaleCheck(client, selector.firstCard, ' ', seoHouseExpected);
  },

  'On search page, the second seo widgets cards should display consistent data': (client) => {
    cardDataBedCheck(client, selector.secondCard, ' a', 'house', seoUnitsExpected);
    cardDataPriceCheck(client, selector.secondCard, ' span', seoUnitsExpected);
    cardDataForSaleCheck(client, selector.secondCard, ' ', seoUnitsExpected);
  },

  'When a user clicks on a raw from the seo widgets cards, the proper url should be loaded': (client) => {
    navigate.toSearchPageBeadell();
    urlLocationAndPropertiesCheck(client);
  },
  'When users search for a suburb, the search page should display a CRE widget linked to this suburb': (client) => {
    navigate.toSearchPage();
    widgetCREUICheck(client);
  },

  'When users search for multiple suburbs, the search page should not display a cre widget': (client) => {
    navigate.toSearchPageMultiSuburbs();
    widgetNotHereCheck(client);
  },

  after: (client) => {
    client.end();
  },
};
