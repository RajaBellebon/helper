const selectors = require('../../pages/login').elements;
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;

let login;
let navigate;

function signInCheck(client) {
  client
    .click(selectors.signIn)
    .verify.urlContains('auth.domain.com.au/v1/login');
}

function logInStatusCheck(client) {
  client
    .waitForElementVisible(selectors.domainHeadline, 15000)
    .verify.urlContains(`${client.launchUrl}`)
    .verify.visible(selectors.avatarLogged);
}

function logOutCheck(client) {
  client
    .waitForElementVisible(selectors.domainHeadline, 15000)
    .verify.urlContains(`${client.launchUrl}`)
    .verify.elementNotPresent(selectors.avatarLogged);
}

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    navigate = client.page.navigate();
    login = client.page.login();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
    navigate.toSearchPage();
  },

  'Should be able to Sign-in from Search page using Email': (client) => {
    signInCheck(client);
    login.loginEmail('test-emails3@domain.com.au', 'domain123');
    logInStatusCheck(client);
    login.logoutHomePage();
    logOutCheck(client);
  },

  'Should be able to Sign-in from Search page using Facebook then Logout': (client) => {
    signInCheck(client);
    login.loginFB('domaintest87@rediffmail.com', 'DomainTest');
    logInStatusCheck(client);
    login.logoutHomePage();
    logOutCheck(client);
  },

  'Should be able to Sign-in from Search page using Google+': (client) => {
    signInCheck(client);
    login.loginGP('domain.andro', 'Domain@100HarrisSt');
    logInStatusCheck(client);
    login.logoutHomePage();
    logOutCheck(client);
  },

  after: (client) => {
    client.end();
  },
};
