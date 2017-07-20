/* eslint-disable max-len */
let navigate;
let listingDetails;
let core;
let currentBrowser;
const globals = require('../../nightwatch.globals').default;

module.exports = {
  '@tags': ['ci'],
  before: (client) => {
    navigate = client.page.navigate();
    core = client.page.core();
    listingDetails = client.page.listingDetails();
    currentBrowser = client.options.desiredCapabilities.browserName;
    core.resizeIe();
    navigate.toListingDetailsListing();
  },

  // Nathan: to investigate why Android is often failing on BS with an error and timing out after 5 mins (Build 656, 655, 654, 651)
  'When on project listing page, \n\t should display Domain header': (client) => {
    const header = listingDetails.section.header;
    if (['chrome', 'firefox', 'ie', 'safari', 'iPhone', 'iPad'].indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        client.verify.visible(header.selector, `${header.selector} should be visible on: ${currentBrowser}`);
        header.expect.element('@navBar').to.be.visible;
      }
    }
  },

  'Should display image gallery': (client) => {
    const imageGallery = listingDetails.section.imageGallery;
    if (['chrome', 'firefox', 'ie', 'safari', 'iPhone', 'iPad'].indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        client.verify.visible(imageGallery.selector,
          `${imageGallery.selector} should be visible on: ${currentBrowser}`);
        imageGallery.expect.element('@image').to.be.visible;
      }
    }
  },

  'Should display branding bar (except desktop)': (client) => {
    const brandingBar = listingDetails.section.brandingBar;
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      client.verify.elementPresent(brandingBar.selector, `${brandingBar.selector} should be present on: ${currentBrowser}`); // eslint-disable-line
      brandingBar.expect.element('@image').to.be.visible;
    }
    if (['chrome', 'firefox', 'ie'].indexOf(currentBrowser) !== -1) {
      // Safari has to be investigated branding-bar is false
      client.verify.hidden(brandingBar.selector, `${brandingBar.selector} should be hidden on:${currentBrowser}`);
      brandingBar.expect.element('@image').to.not.be.visible;
    }
  },

  'Should display project header bar on desktop only': (client) => {
    const projHeader = listingDetails.section.projectHeader;
    if (globals.deviceDesktopList.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        client.verify.visible(projHeader.selector, `${projHeader.selector} should be visible on: ${currentBrowser}`);
        projHeader.expect.element('@image').to.be.visible;
        projHeader.expect.element('@details').to.be.visible;
        projHeader.expect.element('@shortlist').to.be.visible;
        projHeader.expect.element('@buttonCall').to.be.visible;
        projHeader.expect.element('@buttonCall').text.to.equal('Call');
        projHeader.expect.element('@buttonRequestDetails').to.be.visible;
        projHeader.expect.element('@buttonRequestDetails').text.to.equal('Request Details');
      }
    }
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      client.verify.hidden(projHeader.selector, `${projHeader.selector} should be hidden on: ${currentBrowser}`);
      projHeader.expect.element('@image').to.not.be.visible;
    }
  },

  'Should display listing summary': (client) => {
    const listingSummary = listingDetails.section.listingSummary;
    this.listingSummaryTest = () => {
      client.verify.visible(listingSummary.selector, `\n${listingSummary.selector} should be visible on: ${currentBrowser}`); // eslint-disable-line
      listingSummary.expect.element('@title').to.be.visible;
      listingSummary.expect.element('@features').to.be.visible;
      listingSummary.expect.element('@description').to.be.visible;
      listingSummary.expect.element('@additionalLinks').to.be.visible;
      listingSummary.expect.element('@about').to.be.visible;
      listingSummary.expect.element('@suburbInsights').to.be.visible;
      listingSummary.expect.element('@otherApartments').to.be.visible;
      listingSummary.expect.element('@repayment').to.be.visible;
      listingSummary.expect.element('@domainSays').to.be.visible;
    };
    if (['chrome', 'firefox', 'ie'].indexOf(currentBrowser) !== -1) {
      this.listingSummaryTest();
      listingSummary.expect.element('@address').to.not.be.visible;
    }
    if (['iPhone'].indexOf(currentBrowser) !== -1) {
      this.listingSummaryTest();
      listingSummary.expect.element('@address').to.be.visible;
    }
  },

  'Should display Local School Catchments': (client) => {
    const schoolCatchment = listingDetails.section.schoolCatchment;
    this.schoolCatchmentTest = () => {
      schoolCatchment.expect.element('@title').text.to.equal('Local School Catchments');
      schoolCatchment.expect.element('@rows').to.be.visible;
      ['ALL', 'PRIMARY', 'SECONDARY'].forEach((tabText) => {
        listingDetails.clickSchoolCatchmentTabByText(tabText);
        schoolCatchment.expect.element('@activeTab').text.to.contain(tabText);
        schoolCatchment.expect.element('@rows').to.be.visible;
      });
      listingDetails.clickSchoolCatchmentTabByText('OTHER');
      schoolCatchment.expect.element('@activeTab').text.to.contain('OTHER');
      schoolCatchment.expect.element('@rows').to.not.be.present;
      listingDetails.clickSchoolCatchmentTabByText('ALL');
    };
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      client.verify.visible(schoolCatchment.selector, `\n${schoolCatchment.selector} should be visible on: ${currentBrowser}`); // eslint-disable-line
      listingDetails.expandSchoolCatchments();
      this.schoolCatchmentTest();
      listingDetails.collapseSchoolCatchments();
    }
    if (['chrome', 'firefox', 'ie'].indexOf(currentBrowser) !== -1) {
      // Safari has to be investigated - failing on PRIMARY
      core.scrollToElementYOffset(schoolCatchment.selector, -0); // ie workaround
      client.verify.visible(schoolCatchment.selector, `\n${schoolCatchment.selector} should be visible on: ${currentBrowser}`); // eslint-disable-line
      this.schoolCatchmentTest();
    }
  },

  'Should display Inspection Times': (client) => {
    const inspections = listingDetails.section.inspections;
    this.inspectionsTest = () => {
      client.verify.visible(inspections.selector, `${inspections.selector} should be visible on: ${currentBrowser}`);
      inspections.expect.element('@title').to.be.visible;
      inspections.expect.element('@title').text.to.contain('inspections');
      inspections.expect.element('@address').to.be.visible;
      inspections.expect.element('@directions').to.be.visible;
      inspections.expect.element('@times').to.be.visible;
      inspections.expect.element('@makeAppointment').to.be.visible;
      inspections.expect.element('@makeAppointment').text.to.equal('Make an appointment');
    };
    if (['chrome', 'firefox', 'ie', 'safari', 'iPhone', 'iPad'].indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        this.inspectionsTest();
      }
    }
  },

  'Should display footer': (client) => {
    const footer = listingDetails.section.footer;
    if (['chrome', 'firefox', 'ie', 'safari', 'iPhone', 'iPad'].indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        client.verify.visible(footer.selector, `${footer.selector} should be visible on: ${currentBrowser}`);
      }
    }
  },

  after: (client) => {
    client.end();
  },
};
