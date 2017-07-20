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
    navigate.toListingDetailsProject();
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

  'Should display agent details': (client) => {
    const agentDetailSide = listingDetails.section.agentDetailSide;
    const agentDetailInline = listingDetails.section.agentDetailInline;

    this.agentDetailsTest = (section) => {
      client.verify.visible(section.selector, `${section.selector} should be visible on: ${currentBrowser}`);
      client.useCss();
      section.expect.element('@avatar').to.be.visible;
      section.expect.element('@callButton').to.be.visible;
    };
    if (globals.deviceDesktopList.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        this.agentDetailsTest(agentDetailSide);
      }
    }
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      this.agentDetailsTest(agentDetailInline);
    }
  },

  'Should submit enquiry form': (client) => {
    const enquiryModal = listingDetails.section.enquiryModal;
    const enquiryInline = listingDetails.section.enquiryInline;

    this.enquiryTest = (deviceSelector) => {
      listingDetails.clickCtaButton();
      client.verify.visible(deviceSelector, `${deviceSelector} should be visible on: ${currentBrowser}`);

      // validation warnings
      listingDetails.submitEnquiry(deviceSelector, () => {
        listingDetails.getValidationMessageCount(deviceSelector, (count) => {
          client.verify.equal(count, 5, 'Expect 5 validation messages.');
        });
      });
      listingDetails.fillEnquiryForm(deviceSelector);
      listingDetails.submitEnquiry(deviceSelector);
      listingDetails.closeModalIfPresent();
      // todo: verify that the confirmation appears. not yet implemented.
    };
    if (globals.deviceDesktopList.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        this.enquiryTest(enquiryModal.selector);
      }
    }
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      this.enquiryTest(enquiryInline.selector);
    }
  },

  'Should display branding bar (except desktop)': (client) => {
    const brandingBar = listingDetails.section.brandingBar;
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      client.verify.elementPresent(brandingBar.selector, `${brandingBar.selector} should be present on: ${currentBrowser}`); // eslint-disable-line
      client.useCss(); // to address nightwatch issue https://github.com/nightwatchjs/nightwatch/issues/1100 (closed but still happens on latest version)
      brandingBar.expect.element('@image').to.be.visible;
    }
    if (globals.deviceDesktopList.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        client.verify.hidden(brandingBar.selector, `${brandingBar.selector} should be hidden on: ${currentBrowser}.`);
        client.useCss();
        brandingBar.expect.element('@image').to.not.be.visible;
      }
    }
  },

  'Should display project details': (client) => {
    const projectDetails = listingDetails.section.projectDetails;
    this.projectDetailsTest = () => {
      client.verify.visible(projectDetails.selector, `\n${projectDetails.selector} should be visible on: ${currentBrowser}`);
      client.useCss();
      projectDetails.expect.element('@description').to.be.visible;
      projectDetails.expect.element('@additionalLinks').to.be.visible;
      projectDetails.expect.element('@otherApartments').to.be.visible;
      projectDetails.expect.element('@suburbInsights').to.be.visible;
      projectDetails.expect.element('@domainSays').to.be.visible;
      listingDetails.expect.section('@schoolCatchment').to.be.visible;
    };
    if (globals.deviceMobileList.indexOf(currentBrowser) !== -1) {
      projectDetails.expect.element('@header').to.be.visible;
      this.projectDetailsTest();
    }
    if (globals.deviceDesktopList.indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        projectDetails.expect.element('@header').to.not.be.visible;
        this.projectDetailsTest();
      }
    }
  },

  'Should display sticky header on scroll down': (client) => {
    const headerStuck = listingDetails.section.projectDetails.elements.headerStuck.selector;
    if (['chrome', 'firefox', 'ie', 'safari', 'iPhone', 'iPad'].indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        core.scrollToBottom(headerStuck);
        client.verify.visible(headerStuck, `${headerStuck} should be visible on: ${currentBrowser}`);
      }
    }
  },

  'Should display Inspections': (client) => {
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
    const footer = listingDetails.section.footer.selector;
    if (['chrome', 'firefox', 'ie', 'safari', 'iPhone', 'iPad'].indexOf(currentBrowser) !== -1) {
      if (client.options.desiredCapabilities.browserName !== 'safari') {
        client.verify.visible(footer, `${footer} should be visible on: ${currentBrowser}`);
      }
    }
  },

  after: (client) => {
    client.end();
  },
};
