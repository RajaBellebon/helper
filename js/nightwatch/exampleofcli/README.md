# tests

## Summary

Node CLI tool used to run end to end tests from node projects.
Its used to simplify local and browser stack testing

## Usage

```bash
yarn add 
```
## Setup
1. Ensure that you have minimum node version installed and in use.

<sub>Use nvm to check: </sub>
```bash
nvm ls
# if not greater than v7.09, then to install and set v7.10 as your default
nvm install 7.10
nvm alias default 7.10
```
2. Download and install Java SDK for [win](https://domain-blog.s3.amazonaws.com/jdk-8u111-windows-x64.exe)/[osx](https://domain-blog.s3.amazonaws.com/jdk-8u111-macosx-x64.dmg)

## Running End to End tests

Usage can be displayed by using `--help` option:

```
  Usage

    $ 
  
  Options
  
    --health        Health endpoint to target before tests launch, default is '/health'

    --browserstack  If specified tests will run on browserstack through browserstack local
                    (ensure you have BROWSERSTACK_USER and BROWSERSTACK_KEY environment variables set in order for this to work)

    --url           Base URL to use, default is http://localhost:3000

    --config        The location of the nightwatch.conf.js file (which will also use your nightwatch.json) 

    --env           Which testing environment to use - defined in nightwatch.json (defaults to 'ci_ie,ci_chrome,ci_firefox')

    --output        Location where JUnit XML reports will be saved.

    --filter        Filter which test run by file name format using glob expression.

    --test          Runs only the specified test suite., e.g. \'test\' will run test.js.

    --tag           Only tests that have the specified tags will be run.

    --skiptags      Skips tests that have the specified tag or tags.

    --group         Runs only the specified group of tests (subfolder).

    --skipgroup     Skip one or several (comma separated) group of tests.

  Examples:

    $  --config path_to_nightwatch.json --browserstack

    $ f --config path_to_nightwatch.json --url http://stuff.com

    $  --config path_to_nightwatch.json --test components/articleImages

    $  --config path_to_nightwatch.json --group components

    $  --config path_to_nightwatch.json --skiptags data-required,flaky
```

## How to setup nightwatch.conf.js & nightwatch.json files

Your `nightwatch.conf.js` should contain this on your server:

```
const settingsOverride = require('@domain-group//build/nightwatch');

module.exports = settingsOverride(require('./nightwatch.json'));
```

The reason for this is because nightwatch only allows you to specify a path for either `nightwatch.conf.js` or `nightwatch.json`.
So this script will apply the common settings that all projects need as well as apply your related settings from `nightwatch.json`.
If you want to apply any project specific logic this setup also gives you that flexibility.

See [Nightwatch Configuration Docs](http://nightwatchjs.org/gettingstarted#settings-file) on how to setup your `nightwatch.json` which needs to be in the same directory as your `nightwatch.conf.js`
How you set up `nightwatch.json` depends on your use case.


## Common Documentation


## Changes and history

See [CHANGELOG.md](./CHANGELOG.md).
