/* eslint-disable no-unused-expressions */
/** ****** proto methods on Galen Pages element objects  **********/

// Method to scroll to a particular element on the page
(function scrollTo() {

  if (GalenPages && GalenPages.PageElement) {

    GalenPages.PageElement.prototype.scrollIntoView = function () {
      this._report(`ScrollTo ${this.name}`);
      this.waitToBeShown('5s');
      this.getDriver().executeScript('arguments[0].scrollIntoView();', this.getWebElement());
    };
  }
}());
