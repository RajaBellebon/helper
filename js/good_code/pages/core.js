module.exports = {
  elements: {
    any: '*',
  },
  commands: [{
    getElements(cssSelector, callback) {
      this.api.elements('css selector', cssSelector, (elements) => {
        callback(null, elements.value);
      });
      return this;
    },
    getElementText(cssSelector, callback) {
      this.api.getText(cssSelector, (elements) => {
        callback(null, elements.value);
      });
      return this;
    },
    getAttributeText(cssSelector, attribute, callback) {
      this.api.getAttribute(cssSelector, (elements) => {
        callback(null, elements.value);
      });
      return this;
    },
    getElementIdText(cssSelector, callback) {
      this.api.elementIdText(cssSelector, (elements) => {
        callback(null, elements.value);
      });
      return this;
    },
    getElementIdAttribute(cssSelector, attribute, callback) {
      this.api.elementIdAttribute(cssSelector, attribute, (elements) => {
        callback(null, elements.value);
      });
      return this;
    },
    resizeIe() {
      if (this.api.options.desiredCapabilities.browserName === 'ie') {
        this.api.maximizeWindow();
      }
    },
    resizeTo(device) {
      const browserName = this.api.options.desiredCapabilities.browserName;
      if (device === 'desktop') {
        this.api.resizeWindow(
          this.api.globals.default.screenResolution.desktop.width,
          this.api.globals.default.screenResolution.desktop.height
        );
      } else if (device === 'mobile' && browserName !== 'ie') {
        this.api.resizeWindow(
          this.api.globals.default.screenResolution.mobile.width,
          this.api.globals.default.screenResolution.mobile.height
        );
      // note: combining 'mobile' and 'ie' browser results in 'tablet' dimensions
      } else if (device === 'tablet' || (device === 'mobile' && browserName === 'ie')) {
        this.api.resizeWindow(
          this.api.globals.default.screenResolution.iPad12.width,
          this.api.globals.default.screenResolution.iPad12.height
        );
      }
    },
    scrollToBottom(element) {
      this.api.execute('scrollTo(0, 1500)');
      this.api.waitForElementVisible(element, this.api.globals.default.waitForConditionTimeout);
    },
    scrollToElementYOffset(element, offset) { // used to better center element on screen
      this.api.waitForElementVisible(element, this.api.globals.default.waitForConditionTimeout);
      this.api.getLocation(element, (location) => {
        this.api.execute(`scrollTo(0, ${location.value.y + offset})`);
      });
    },
  }],
};
