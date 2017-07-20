module.exports = {
  elements: {
    authFaceBook: '.social-authentication__facebook',
    authGoogle: '.social-authentication__google',
    avatarLogged: '.header-member__avatar-toggle',
    avatarDropdown: '.header-member__dropdown-content',
    domainHeadline: '.domain-home__headline',
    emailClear: '.agent-membership-login__input',
    emailName: '[name="username"]',
    emailPwd: '[type="password"]',
    faceBookEmail: '#email',
    faceBookPwd: '#pass',
    faceBookLogin: '#loginbutton',
    googleEmail: '#identifierId',
    googleNext: '[role="button"]:nth-child(1)',
    googleSignIn: '#signIn',
    googlePwd: '[type="password"]',
    loggedOut: '.member-dropdown__logged-out',
    loggedOutBtn: '.domain-icon-logout',
    loggedOutLink: '.membership-form__link',
    loginBtn: '.membership-form__submit',
    signIn: '.header-member__sign-in',
    signUp: '.header-member__sign-up',
  },
  commands: [{
    loginFB(user, pas) {
      this
        .waitForElementVisible('@authFaceBook', 2000)
        .click('@authFaceBook')
        .waitForElementVisible('@faceBookEmail', 2000)
        .setValue('@faceBookEmail', user)
        .waitForElementVisible('@faceBookPwd', 2000)
        .setValue('@faceBookPwd', pas)
        .click('@faceBookLogin');
      return this;
    },
    loginGP(user, pas) {
      this
        .waitForElementVisible('@authGoogle', 2000)
        .click('@authGoogle')
        .waitForElementVisible('@googleEmail', 2000)
        .setValue('@googleEmail', user)
        .waitForElementVisible('@googleNext', 2000)
        .click('@googleNext')
        .waitForElementVisible('@googlePwd', 2000)
        .setValue('@googlePwd', pas)
        .click('@googleNext');
      return this;
    },
    clearValues() {
      this
        .waitForElementVisible('@emailName', 2000)
        .waitForElementVisible('@emailPwd', 2000)
        .clearValue('@emailName')
        .clearValue('@emailPwd');
      return this;
    },
    loginEmail(user, pas) {
      this
        .clearValues()
        .setValue('@emailName', user)
        .setValue('@emailPwd', pas)
        .click('@loginBtn');
      return this;
    },
    logoutHomePage() {
      this
        .click('@avatarLogged')
        .waitForElementVisible('@avatarDropdown', 1000)
        .click('@loggedOutBtn')
        .navigate(`${this.api.launchUrl}/home?mode=rent`);
      return this;
    },
  }],
};
