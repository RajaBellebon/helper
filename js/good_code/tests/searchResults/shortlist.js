const selectors = require('../../pages/shortlist').elements;
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;

let login;
let navigate;
let shortlist;

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    navigate = client.page.navigate();
    login = client.page.login();
    shortlist = client.page.shortlist();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPageBeadell();
  },

  'On the search page, listings should have a shortlist icon visible': (client) => {
    client.page.core().getElements(selectors.shortListIcon, (err, icons) => {
      icons.forEach((icon) => {
        client.verify.visible(icon);
      });
    });
  },

  'If user is not logged in and tries to shortlist a property, the Sign-in/up page is displayed': (client) => {
    client.page.core().getElementText(selectors.shortListToggle, (err, numberOfShortList) => {
      client.verify.equal('', numberOfShortList);
    });
    shortlist
      .nbreOfProperties(1)
      .verify.visible('auth.domain.com.au/v1/login');
  },

  'If user is logged in + has shortlisted displayed properties, the shortlist menu is populated': (client) => {
    navigate.toSearchPageBeadell();
    login
      .click('@signIn')
      .loginEmail('test-emails3@domain.com.au', 'domain123')
      .expect.element('@avatarLogged');
    shortlist
      .nbreOfProperties(3)
      .verify.cssClassPresent(selectors.shortListIcon, 'is-shortlisted');
    client.page.core().getElementText(selectors.shortListToggle, (err, numberOfShortList) => {
      client.verify.equal('3', numberOfShortList);
    });
    shortlist.click(selectors.shortListToggle);
    // Check the number in the shortlist header
    // Check the listings info + id
    // Check the menu using see all
    // Logout
  },

  'If user is logged in and is un-shortlisting properties, they should disappear from the shortlist menu': () => {
    login
      .click('@signIn')
      .loginEmail('test-emails3@domain.com.au', 'domain123')
      .verify.visible('@avatarLogged');
    // Check if properties have been shortlisted -If not sortlist
    // Remove one shortlist from the search results page and compare the menu
    // Remove all shortlist from the menu
  },

  'On search page, should be able to shortlist a child listings': () => {

  },

  after: (client) => {
    client.end();
  },
};
