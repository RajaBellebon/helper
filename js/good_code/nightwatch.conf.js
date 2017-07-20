const settingsOverride = require('@domain-group/fe-e2e-tests/build/nightwatch');

module.exports = settingsOverride(require('./nightwatch.json'));
