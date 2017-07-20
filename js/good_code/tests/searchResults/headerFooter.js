const selector = require('../../pages/headerFooter').elements;
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;

let headerFooter;
let navigate;

function domainLogoHeaderCheck(client) {
  client
    .verify.visible(selector.logo)
    .verify.attributeEquals(selector.logo, 'title', 'Domain homepage')
    .verify.attributeEquals(selector.logo, 'href', 'https://www.domain.com.au/')
    .click(selector.logo)
    .verify.title(expected.default.title.home)
    .verify.urlEquals('https://www.domain.com.au/')
    .back();
}

function desktopMenuOptionCheck(client, menu, expectedValue, cssSelector) {
  client.page.core().getElements(cssSelector, (error, menuOptions) => {
    client.verify.equal(expectedValue.length, menuOptions.length);
    menuOptions.forEach((option, idx) => {
      client.page.core().getElementIdText(option.ELEMENT, (err, optionText) => {
        client.verify.equal(optionText, expectedValue[idx],
          `Expected ${menu} menu options: ${expectedValue[idx]}, but got:${optionText}`);
      });
    });
  });
}

function desktopMenuOptionLinksCheck(client) {
  client.page.core().getElements(selector.desktopMenuOptionLink, (error, menuOptionsLinks) => {
    menuOptionsLinks.forEach((links) => {
      client.page.core().getElementIdAttribute(links.ELEMENT, 'href', (err, href) => {
        client.verify.equal(
          (href.includes('domain.com.au') || href.includes('commercial')), true, href);
      });
    });
  });
}

function dropDownLinksCheck(client, expectedValue) {
  client.page.core().getElements(selector.navDropDownLink, (error, menuOptionsLinks) => {
    menuOptionsLinks.forEach((links, idx) => {
      client.page.core().getElementIdAttribute(links.ELEMENT, 'href', (err, href) => {
        client.verify.equal(href.includes(expectedValue[idx]), true, href);
      });
    });
  });
}

function dropDownNumbers(client, number) {
  client.page.core().getElements(selector.navDropDown, (error, dropDown) => {
    client.verify.equal(dropDown.length, number);
  });
}

function shortListSavedSearchCheck(client, cssSelector, text1, text2) {
  client
    .verify.visible(cssSelector)
    .click(cssSelector)
    .verify.visible(selector.content)
    .verify.visible(selector.title)
    .verify.visible(selector.loggedOut)
    .verify.visible(selector.searchSignUp)
    .verify.attributeContains(selector.searchSignUp, 'href', 'domain.com.au/authentications/')
    .verify.attributeContains(selector.searchSignUp, 'href', 'signup')
    .expect.element(selector.title).text.to.equal(text1);

  client.expect.element(selector.text).text.to.equal(text2);
  client.expect.element(selector.searchSignUp).text.to.equal('Create an account');
  client
    .click(selector.domainHeadline)
    .expect.element(selector.content).to.not.be.present.after(3000);
}

function domainFooterLogoCheck(client) {
  client
    .verify.visible(selector.footer)
    .verify.visible(selector.footerDesktop)
    .verify.visible(selector.footerToolBar)
    .verify.visible(selector.footerToolBarLogo)
    .verify.attributeEquals(selector.footerToolBarLogo, 'alt', 'Domain')
    .verify.attributeContains(selector.footerToolBarLogo, 'href', '//www.domain.com.au/')
    .click(selector.footerToolBarLogo)
    .verify.title(expected.default.title.home)
    .verify.urlEquals('https://www.domain.com.au/')
    .back();
}

function domainFooterNavigationBarAndLinksCheck(client) {
  client
    .verify.visible(selector.agentAdminBtn)
    .verify.attributeContains(selector.agentAdminBtn, 'href', '//admin.domain.com.au/')
    .click(selector.agentAdminBtn)
    .verify.title('Domain Identity')
    .verify.urlContains('https://auth.domain.com.au/v1/login')
    .back()
    .expect.element(selector.agentAdminBtn).text.to.equal('Agent admin');
}

function elementsTextAndAttributeIDCheck(client, expectedValueText, expectedValueAttribute, cssSelectors) {
  client.page.core().getElements(cssSelectors, (err, navItems) => {
    client.verify.equal(navItems.length, expectedValueText.length,
      `The number of links expected: ${expectedValueText.length}, got:${navItems.length}`);
    navItems.forEach((item, idx) => {
      client.page.core().getElementIdText(item.ELEMENT, (error, linkText) => {
        client.verify.equal(linkText, expectedValueText[idx],
          `Expected text option/link: ${expectedValueText[idx]}, got: ${linkText}`);
      });
      client.page.core().getElementIdAttribute(item.ELEMENT, 'href', (err1, href) => {
        client.verify.equal(href, expectedValueAttribute[idx],
          `Expected attribute option/link: ${expectedValueAttribute[idx]}, got: ${href}`);
      });
    });
  });
}

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    headerFooter = client.page.headerFooter();
    navigate = client.page.navigate();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPage();
  },

  'On search page, the header bar should display the domain logo': (client) => {
    domainLogoHeaderCheck(client);
  },

  'On search page, the header bar should display some options with 3 dropdowns': (client) => {
    headerFooter.verify.visible('@navigationList');
    desktopMenuOptionCheck(client, 'desktop',
      expected.default.navButtons.name, selector.desktopMenuOption);
    desktopMenuOptionLinksCheck(client);
    dropDownNumbers(client, 3);
  },

  'On search page, the header bar should display a more dropdown with options': (client) => {
    headerFooter
      .click('@dropDownMore')
      .verify.visible('@dropDownContent');
    desktopMenuOptionCheck(client, 'More',
      expected.default.moreButtons.name, selector.navDropDownItem);
    dropDownLinksCheck(client, expected.default.moreButtons.href);
  },

  'On search page, the header bar should display a news dropdown with options': (client) => {
    headerFooter
      .click('@dropDownNews')
      .verify.visible('@dropDownContent');
    desktopMenuOptionCheck(client, 'News',
      expected.default.newsButtons.name, selector.navDropDownItem);
    dropDownLinksCheck(client, expected.default.newsButtons.href);
  },

  'On search page, the header bar should display an advice dropdown with options': (client) => {
    headerFooter
      .click('@dropDownAdvice')
      .verify.visible('@dropDownContent');
    desktopMenuOptionCheck(client, 'Advice',
      expected.default.adviceButtons.name, selector.navDropDownItem);
    dropDownLinksCheck(client, expected.default.adviceButtons.href);
  },

  'On search page, the header bar should display a saved Search icon': (client) => {
    shortListSavedSearchCheck(
      client, selector.savedSearch,
      'Saved searches', 'Keep your frequent searches in one place.');
  },

  'On search page, the header bar should display a shortlist icon': (client) => {
    shortListSavedSearchCheck(
      client, selector.shortList,
      'Shortlist', 'Keep your favourite homes in one place.');
  },

  'On search page, the footer toolbar should display the domain logo': (client) => {
    domainFooterLogoCheck(client);
  },

  'On search page, the footer toolbar should display a navigation bar with links': (client) => {
    headerFooter.click('@footerPartnersText');
    elementsTextAndAttributeIDCheck(client,
      expected.default.footerNavLink.name,
      expected.default.footerNavLink.href,
      selector.footerToolBarNavItemLink);
    domainFooterNavigationBarAndLinksCheck(client);
  },

  'On search page for 1 suburb, the single footer should be displayed + seo': (client) => {
    navigate.toSearchPage();
    client
    .verify.visible(selector.seoFooter)
    .verify.containsText('Vaucluse')
    .verify.containsText('Apartments')
    .verify.containsText('House')
    .verify.containsText('For Sale')
    .verify.containsText('For Rent')
    .verify.containsText('Domain')
    .verify.containsText('Surrounding Suburbs');
  },

  after: (client) => {
    client.end();
  },
};
