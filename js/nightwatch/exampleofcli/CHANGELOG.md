# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [0.2.4][] - 2017-07-17
### Fix 
- Final Jenkins adjustments fixed. 
## [0.2.3][] - 2017-07-17
### Fix
- Jenkins isn't impossible to test without committing so trying again... 

### Fix 
- More issues with Jenkins git commit logging

## [0.2.2][] - 2017-07-17
### Fix
- Small issue fetching the git head during Jenkins run. 

## [0.2.1][] - 2017-07-17
### Added :raised_hands:
- Browserstack runs now grouped by build by default! 


<sub>NOTE: this requires updating nightwatch.json default desired capabilities to have the 'build' prop:</sub>
```
"test_settings": {
    "default": {
      "skip_testcases_on_fail": false,
      "end_session_on_fail": false,
      "selenium_host": "localhost",
      "selenium_port": 4444,
      "launch_url" : "http://localhost:3000/",
      "desiredCapabilities": {
#######################        
        "build": "",
#######################
        "project": "fe-server-search-results",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "browserName": "chrome"
      }
    }
``` 
### Fixed
- Build info display, when available, in CLI and Browserstack sidebar:
  - :octocat: **git HEAD** of the project under test 
  - :squirrel: **npm_package_version** of the parent under test
### Added
- Build info display, when available, in CLI and Browserstack:
  - :older_man: **Jenkins**: :hash: BUILD_NUMBER and :christmas_tree: BRANCH_NAME to facilitate ci issues

### Added
- :key: ENV_VARS  added to project under test to facilitate debugging:
  - :squirrel: **NPM_PACKAGE_VERSION** (`process.env.NPM_PACKAGE_VERSION`)
  - :octocat: **GIT_HEAD** (`process.env.GIT_HEAD`)

## [0.2.0][] - 2017-07-14
### Changed
- Browserstack group by build (version + git head)

## [0.1.2][] - 2017-07-03
### Added
- Can specify custom health endpoint for pretest check
### Changed
- Fixed health check

## [0.1.1][] - 2017-04-20
### Fixed 
- Dotenv require move to browserscript.js

## [0.1.0][] - 2017-04-20
### Added
- Dotenv setup

## [0.0.4][] - 2017-04-20
### Fixed
- Path to .bin/nightwatch fix

## [0.0.3][] - 2017-04-06
### Fixed
- Issue with nightwatch.conf.js
- Downgraded selenium - 3 has some weird issues

## [0.0.2][] - 2017-04-06
### Fixed
- added hash bang node path
- Fixed referencing build path

## [0.0.1][] - 2017-04-05
### Added
- Created initial setup


[Unreleased]: https://github.com/domain-group/fe-e2e-tests/compare/v0.2.4...HEAD
[0.2.4]: https://github.com/domain-group/fe-e2e-tests/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/domain-group/fe-e2e-tests/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/domain-group/fe-e2e-tests/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/domain-group/fe-e2e-tests/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/domain-group/fe-e2e-tests/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/domain-group/fe-e2e-tests/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/domain-group/fe-e2e-tests/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/domain-group/fe-e2e-tests/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/domain-group/fe-e2e-tests/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/domain-group/fe-e2e-tests/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/domain-group/fe-e2e-tests/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/domain-group/fe-e2e-tests/tree/v0.0.1
