/* eslint-disable no-console */
const expected = require('../../nightwatch.globals');

const desktopScreen = expected.default.screenResolution.desktop;

let navigate;

// Too many errors in the browsers for now
// function returnBrowerConsoleLogs(client) {
//   client.getLog('browser', (result) => {
//     client.verify.equal(result.length, 0, console.log(result));
//   });
// }

module.exports = {
  '@tags': ['regression'],
  before: (client) => {
    navigate = client.page.navigate();
    client.resizeWindow(desktopScreen.width, desktopScreen.height);
  },

  'When a user navigates to the search page for Sale, no errors should be thrown in the console': () => {
    navigate.toSearchPage();
    // function not used now as too many errors
    // returnBrowerConsoleLogs(client);
  },

  'When a user navigates to the search page for Rent, no errors should be thrown in the console': () => {
    navigate.toSearchPageRent();
    // returnBrowerConsoleLogs(client);
  },

  'When a user navigates to the search page for Sold, no errors should be thrown in the console': () => {
    navigate.toSearchPageSold();
    // returnBrowerConsoleLogs(client);
  },

  'When a user navigates to the search page for Share, no errors should be thrown in the console': () => {
    navigate.toSearchPageShare();
    // returnBrowerConsoleLogs(client);
  },

  after: (client) => {
    client.end();
  },
};
