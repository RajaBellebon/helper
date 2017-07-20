const shortListIconSelector = '.listing-result__shortlist';

module.exports = {
  elements: {
    homePage: '#homepage',
    container: '.search-results__container',
    domainHeadline: '.domain-home__headline',
    shortListToggle: '.member-dropdown__toggle-shortlist',
    shortListIcon: shortListIconSelector,
  },
  commands: [{
    nbreOfProperties(number) {
      this.api.page.core().getElements(shortListIconSelector, (shortLists) => {
        shortLists.forEach((shortList, idx) => {
          if (number < idx) {
            this.click(shortLists.value[idx].ELEMENT);
          }
        });
      });
      return this;
    },
  }],
};
