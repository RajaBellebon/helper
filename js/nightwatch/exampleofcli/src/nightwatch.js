/* eslint-disable no-param-reassign, wrap-iife, func-names, global-require, import/no-unresolved */
/**
 * Override settings from nightwatch.json
 * to include browser stack settings and env settings
 */
module.exports = function settingsOverride(settings) {
  const browserStackSettings = {
    host: 'hub.browserstack.com',
    port: 80,
  };

  if (process.env.USE_BROWSERSTACK &&
    process.env.USE_BROWSERSTACK.toLowerCase() === 'true') {

    Object.keys(settings.test_settings).forEach((key) => {
      const testEnv = settings.test_settings[key];
      if (key !== 'default') {
        testEnv.selenium_port = browserStackSettings.port;
        testEnv.selenium_host = browserStackSettings.host;
        testEnv.desiredCapabilities['browserstack.user'] = process.env.BROWSERSTACK_USER;
        testEnv.desiredCapabilities['browserstack.key'] = process.env.BROWSERSTACK_KEY;
        testEnv.desiredCapabilities['browserstack.local'] = true;
      }

      // add to test_settings
      settings.test_settings[key] = testEnv;
    });
  } else {
    // start selenium automatically
    settings.selenium.start_process = true;
    settings.selenium.server_path = require('selenium-server-standalone-jar').path;
    settings.selenium.cli_args = { 'webdriver.chrome.driver': require('chromedriver').path };
  }

  // Group test run by 'build' (npm-version.last-commit)
  if (process.env.GIT_HEAD && process.env.NPM_PACKAGE_VERSION) {
    const gitHeadShort = process.env.GIT_HEAD.slice(0, -33);
    const version = process.env.NPM_PACKAGE_VERSION;

    settings.test_settings.default.desiredCapabilities.build =
      `v${version}.${gitHeadShort}`;

    // if available, add the jenkins build info too
    if (process.env.BUILD_NUMBER && process.env.BRANCH_NAME) {
      const jenkinsBuild = process.env.BUILD_NUMBER;
      const branch = process.env.BRANCH_NAME;

      settings.test_settings.default.desiredCapabilities.build =
        `#${jenkinsBuild} (${branch}) - v${version}.${gitHeadShort}`;
    }
  } else if (process.env.GIT_HEAD) { // group 'build' by commit if no version
    const gitHeadShort = process.env.GIT_HEAD.slice(0, -33);
    settings.test_settings.default.desiredCapabilities.build = `Project Last Commit: ${gitHeadShort}`;
  }

  if (process.env.BASE_URL) {
    settings.test_settings.default.launch_url = process.env.BASE_URL;
  }

  return settings;
};
