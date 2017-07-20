let number;

module.exports = {
  elements: {
    agentAdminBtn: '.footer__agent-admin-btn',
    content: '.member-dropdown__content',
    domainHeadline: '.domain-home__headline',
    domainBackground: '.domain-home__background',
    domainBlur: '.domain-home__blur-image',
    dropDownNews: '.desktop-nav__dropdown:nth-child(6)',
    dropDownMore: '.desktop-nav__dropdown:nth-child(9)',
    dropDownAdvice: '.desktop-nav__dropdown:nth-child(7)',
    dropDownContent: '.desktop-nav__dropdown-content',
    dropDownOptionsContent: '.domain-multi-select__selectmenu-dropdown',
    desktopMenuOption: '.desktop-nav__menu-option',
    desktopMenuOptionLink: '.desktop-nav__menu-option-link',
    footer: '.footer',
    footerColumn: '.footer-quicklinks__columns',
    footerDesktop: '.footer-desktop',
    footerToolBarLogo: '.footer-toolbar__logo',
    footerToolBar: '.footer-toolbar',
    footerQuickLinks: '.footer-quicklinks',
    footerPartners: '.footer-partners',
    footerPartnersInner: '.footer-partners__inner',
    footerPartnersLeft: '.footer-partners__left',
    footerPartnersRight: '.footer-partners__right',
    footerPartnersText: '.footer-partners__menu-title',
    footerPartnersMenu: '.footer-partners__menu',
    footerPartnersDropdownList: '.footer-partners__dropdown-list',
    footerPartnersMenuToggle: '.footer-partners__menu-toggle',
    footerSocial: '.footer-social',
    footerToolBarNavItemLinkSelector: '.footer-toolbar__nav-item-link',
    footerQuickLinksHeadingSelector: '.footer-quicklinks__heading',
    footerQuickLinksItemSelector: '.footer-quicklinks__link',
    footerAffilitateBtnSelector: '.footer__affiliate-btn',
    footerPartnersMenuTitleSelector: '.footer-partners__menu-title',
    footerMenuToggleSelector: '.footer-partners__menu-toggle',
    footerDropdownLinksSelector: '.footer-partners__dropdown-link',
    footerSocialBtnSelector: '.footer-partners__social-btn',
    navDropDown: '.desktop-nav__dropdown',
    navDropDownItem: '.desktop-nav__dropdown-item',
    navDropDownLink: '.desktop-nav__dropdown-item-link',
    logo: '.header__logo',
    loggedOut: '.member-dropdown__logged-out',
    loggedOutBtn: '.domain-icon-logout',
    loggedOutLink: '.membership-form__link',
    loginBtn: '.membership-form__submit',
    navigationList: '.desktop-nav__list',
    savedSearch: '.member-dropdown__toggle-savedsearch',
    searchSignUp: '.member-dropdown__sign-up',
    seoFooter: '.search-results__seo-footer',
    shortList: '.member-dropdown__toggle-shortlist',
    signIn: '.header-member__sign-in',
    signUp: '.header-member__sign-up',
    tagLine: '.domain-home__tagline',
    text: '.member-dropdown__text',
    title: '.member-dropdown__title',
  },
  commands: [{
    dropDownValNews(val) {
      if (val.includes('news') && !val.includes('news/')) {
        number = 2;
      } else {
        number = 1;
      }
      return number;
    },
    dropDownValAdvice(val) {
      if (val.includes('advice/b') || val.includes('advice/d')
          || val.includes('advice/r') || val.includes('advice/i')
          || val.includes('advice/s') || val.includes('advice/g')) {
        number = 2;
      } else {
        number = 1;
      }
      return number;
    },
  }],
};
