/* eslint-disable no-console */
const globals = require('../nightwatch.globals').default;

const schoolCatchment = '.listing-details__school-catchment';
const expandButton = `${schoolCatchment} button.listing-details__expand-button`;
const collapsed = `${schoolCatchment} .expander-content.expander-content-inactive`;
const expanded = `${schoolCatchment} .expander-content.expander-content-active`;
const validationMessages = '.is-invalid';
const firstName = 'input[name="firstName"]';
const lastName = 'input[name="lastName"]';
const email = 'input[name="email"]';
const buyerType = '.Select-arrow';
const postCode = 'input[name="postcode"]';
const modalClose = '.modal__close';

module.exports = {
  schoolCatchment,
  sections: {
    header: {
      selector: '.header',
      elements: {
        navBar: '.header__toolbar',
      },
    },
    imageGallery: {
      selector: '.listing-details__gallery',
      elements: {
        image: '.image-gallery-image img',
      },
    },
    agentDetailSide: { // desktop
      selector: '.listing-details__agent-details',
      elements: {
        avatar: '.slick-active .listing-details__agent-details-agent-avatar',
        callButton: '.listing-details__cta-button',
      },
    },
    agentDetailInline: { // responsive
      selector: '.listing-details__agent-enquiry',
      elements: {
        avatar: '.listing-details__agent-enquiry-agent-avatar',
        callButton: '.listing-details__agent-enquiry-agent-phone',
      },
    },
    enquiryModal: { // desktop
      selector: '.modal .listing-details__enquiry-form',
      elements: {
        submit: '.listing-details__enquiry-form-submit',
      },
    },
    enquiryInline: { // responsive
      selector: '.listing-details__enquiry-form-inline',
      elements: {
        submit: '.listing-details__enquiry-form-submit',
      },
    },
    projectHeader: {
      selector: '.listing-details__project-header-fixed',
      elements: {
        image: 'img',
        details: '.listing-details__title-wrapper',
        shortlist: '.listing-details__project-header-ctas button.listing-details__shortlist-button',
        buttonCall: 'a.is-outline',
        buttonRequestDetails: 'button.is-highlight',
      },
    },
    brandingBar: {
      selector: '.listing-details__branding-bar',
      elements: {
        image: 'img',
      },
    },
    projectDetails: {
      selector: '.listing-details__project-details-container',
      elements: {
        header: '.listing-details__project-title',
        headerStuck: '.listing-details__project-header-stuck.is-active',
        description: '.listing-details__description',
        additionalLinks: '.listing-details__additional-links',
        otherApartments: '.listing-details__project-other-listings',
        domainSays: '.listing-details__domain-says',
        suburbInsights: '.listing-details__suburb-insights',
        inspections: '.listing-details__inspections',
      },
    },
    listingSummary: {
      selector: '.listing-details__project-details-main',
      elements: {
        title: '.listing-details__listing-summary-title',
        features: '.listing-details__listing-summary-features',
        address: '.listing-details__listing-summary-address',
        repayment: '.listing-details__listing-summary-repayment',
        description: '.listing-details__description',
        additionalLinks: '.listing-details__additional-links',
        about: '.listing-details__about-development',
        domainSays: '.listing-details__domain-says',
        suburbInsights: '.listing-details__suburb-insights',
        otherApartments: '.listing-details__child-other-listings',
      },
    },
    inspections: {
      selector: '.listing-details__inspections',
      elements: {
        title: '.listing-details__inspections-title',
        address: '.listing-details__inspections-info',
        directions: '.listing-details__inspections-directions',
        times: '.listing-details__inspections-slots',
        makeAppointment: '.listing-details__inspections-appointment-link',
      },
    },
    schoolCatchment: {
      selector: schoolCatchment,
      elements: {
        title: '.expander__collapsible-panel-title',
        expandBtn: expandButton,
        tabs: '.school-catchment__tab-link',
        activeTab: '.school-catchment__tab-link.is-active > span',
        rows: '.school-catchment__school',
      },
    },
    callToAction: {
      selector: '.listing-details__enquiry-container',
      elements: {
        button: 'button',
      },
    },
    footer: {
      selector: '.footer',
    },
  },
  commands: [{
    clickCtaButton() {
      this.click('.listing-details__cta-button');
    },
    fillEnquiryForm(deviceSelector) {
      this.sendKeys(`${deviceSelector} ${firstName}`, 'Mr.');
      this.sendKeys(`${deviceSelector} ${lastName}`, 'Test');
      this.sendKeys(`${deviceSelector} ${email}`, 'my@email.com');
      this.click(`${deviceSelector} ${buyerType}`); // todo: dropdown selection data
      this.sendKeys(`${deviceSelector} ${postCode}`, '2009');
    },
    closeModalIfPresent() {
      this.api.element('css selector', modalClose, (result) => {
        if (result.status === 0) {
          this.click(modalClose);
        }
      });
    },
    submitEnquiry(deviceSelector) {
      const target = `${deviceSelector} .listing-details__enquiry-form-submit`;
      this.scrollElementBelowHeader(target);
      this.click(target);
    },
    getValidationMessageCount(parentSelector, callback) {
      this.api.elements('css selector', `${parentSelector} ${validationMessages}`, (validations) => {
        callback(validations.value.length);
      });
    },
    getHeaderHeight(callback) {
      this.api.getElementSize('.header', (size) => {
        callback(size.value.height);
      });
      return this;
    },
    scrollElementBelowHeader(element) {
      this.getHeaderHeight((headerHeight) => {
        this.api.page.core().scrollToElementYOffset(element, -headerHeight - 10);
      });
    },
    expandSchoolCatchments() {
      this.api.element('css selector', collapsed, (result) => {
        if (result.status === 0) { // if Element exists, do something
          this.getHeaderHeight((headerHeight) => {
            this.api.page.core().scrollToElementYOffset(schoolCatchment, -headerHeight);
            this.api.click(expandButton);
            this.api.waitForElementVisible('.school-catchment__tab-head', globals.waitForConditionTimeout);
          });
        } else {
          console.warn(`
            WARNING: ${schoolCatchment} remained opened unexpectedly.
            This needs a manual check. (i.e. open and close the expander). Could be due to newly stale test steps.`
          );
        }
      });
    },
    collapseSchoolCatchments() {
      this.api.element('css selector', expanded, (result) => {
        if (result.status === 0) {
          this.getHeaderHeight((headerHeight) => {
            this.api.page.core().scrollToElementYOffset(schoolCatchment, -headerHeight - 10);
            this.api.click(expandButton);
            this.api.waitForElementNotVisible('.school-catchment__tab-head', globals.waitForConditionTimeout);
          });
        } else {
          console.warn(`
            WARNING: ${schoolCatchment} remained closed unexpectedly.
            This needs a manual check. (i.e. open and close the expander). Could be due to newly stale test steps.`
          );
        }
      });
    },
    clickSchoolCatchmentTabByText(text) {
      this.api.elements('css selector', '.school-catchment__tab-link > span:nth-child(1)', (tabElements) => {
        this.getHeaderHeight((headerHeight) => {
          this.api.page.core().scrollToElementYOffset(schoolCatchment, -headerHeight);
          tabElements.value.forEach((tabElement) => {
            this.api.elementIdText(tabElement.ELEMENT, (tabElementText) => {
              if (tabElementText.value === text) { // if word found.
                this.api.elementIdClick(tabElement.ELEMENT);
              }
              return this;
            });
          });
        });
      });
    },
  }],
};
