#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const health = require('./health');
const browserstack = require('./browserstack');
const spawn = require('cross-spawn-async');
const path = require('path');
const childProcess = require('child_process');

let child = null;
let childIsAlive = true;
let childExitCode = 0;
let runCmd = [];

const argv = yargs
  .options({
    health: {
      alias: 'h',
      describe: 'Endpoint target for pre-run check, default is \'/health\'.',
      default: '/health',
    },
    browserstack: {
      describe: 'If specified tests will run on browserstack through browserstack local',
      // Defaults to local selenium
      default: false,
    },
    url: {
      alias: 'u',
      describe: 'Base URL to use, default is http://localhost:3000',
      // Defaults to running against dev server
      default: 'http://localhost:3000',
    },

    /**
     * Below are nightwatch command specific properties
     * Please keep them in line with nightwatch cli
     */
    config: {
      alias: 'c',
      describe: 'The location of the nightwatch.conf.js file',
      demandOption: true,
    },
    env: {
      alias: 'e',
      describe: 'Which testing environment to use - defined in nightwatch.json',
      // default to 3 common browsers which means you need to have these setup in your nightwatch.json
      default: 'ci_ie,ci_chrome,ci_firefox',
    },
    output: {
      alias: 'o',
      describe: 'Location where JUnit XML reports will be saved.',
    },
    filter: {
      alias: 'f',
      describe: 'Filter which test run by file name format using glob expression.',
    },
    test: {
      alias: 't',
      describe: 'Runs only the specified test suite., e.g. \'test\' will run test.js.',
    },
    tag: {
      alias: 'a',
      describe: 'Only tests that have the specified tags will be run.',
    },
    skiptags: {
      describe: 'Skips tests that have the specified tag or tags.',
    },
    group: {
      alias: 'g',
      describe: 'Runs only the specified group of tests (subfolder).',
    },
    skipgroup: {
      alias: 's',
      describe: 'Skip one or several (comma separated) group of tests.',
    },
  })
  .help('help')
  .showHelpOnFail(true, 'Specify --help for available options')
  .wrap(yargs.terminalWidth())
  .example('Local run for specific test:', '-t test')
  .example('Browserstack run against stage:', '--browserstack -u http://stage.domain.com.au')
  .example('Specific Test example:', '--test components/articleImages')
  .example('Group example:', '--group components')
  .example('Skiptags example:', '--skiptags data-required,flaky')
  .argv;

async function runTests() {
  // Get and set env vars build info if available
  if (process.env.npm_package_version) {
    process.env.NPM_PACKAGE_VERSION = process.env.npm_package_version;
    console.log(chalk.bold.cyan('Project Version: '), process.env.npm_package_version);
  } else {
    console.error(chalk.bold.red('missing process.env.npm_package_version'));
  }

  if (process.env.GIT_HEAD) {
    // if not a git repo, it must be in Jenkins CI which uses GIT_HEAD env var
    console.log(chalk.bold.cyan('Project Last Commit: '), process.env.GIT_HEAD);
  } else {
    childProcess.exec('git rev-parse HEAD', (err, hash) => {
      if (err !== null) {
        console.error(err);
      } else {
        process.env.GIT_HEAD = hash;
        console.log(chalk.bold.cyan('Project Last Commit: '), hash);
      }
    });
  }

  if (process.env.BUILD_NUMBER && process.env.BRANCH_NAME) {
    console.log(chalk.bold.bgBlue('Jenkins Build: '), process.env.BUILD_NUMBER, process.env.BRANCH_NAME);
  }

  console.log(chalk.bold.cyan('Browserstack: '), argv.browserstack);
  console.log(chalk.bold.cyan('Base URL: '), argv.url);

  // need to set these environment vars for use in nightwatch.conf.js
  process.env.USE_BROWSERSTACK = argv.browserstack;
  process.env.BASE_URL = argv.url;

  // set health endpoint
  const result = await health.healthCheck(`${argv.url}${argv.health}`);

  if (!result) {
    process.exit(1);
  }

  // check browser stack sessions
  if (argv.browserstack) {
    const bsResult = await browserstack.checkSessions();

    if (!bsResult) {
      process.exit(1);
    }

    runCmd = runCmd.concat(['--env', argv.env]);
  }

  // build out the rest of the nightwatch params
  if (argv.config) {
    console.log(chalk.bold.cyan('Config: '), argv.config);
    runCmd = runCmd.concat(['--config', `${argv.config}`]);
  }

  if (argv.output) {
    console.log(chalk.bold.cyan('Output: '), argv.output);
    runCmd = runCmd.concat(['--output', `${argv.output}`]);
  }

  if (argv.filter) {
    console.log(chalk.bold.cyan('Filter: '), argv.filter);
    runCmd = runCmd.concat(['--filter', `${argv.filter}`]);
  }

  if (argv.test) {
    console.log(chalk.bold.cyan('Specific Test: '), argv.test);
    runCmd = runCmd.concat(['--test', `${argv.test}`]);
  }

  if (argv.tag) {
    console.log(chalk.bold.cyan('Tags Targetted: '), argv.tag);
    runCmd = runCmd.concat(['--tag', `${argv.tag}`]);
  }

  if (argv.skiptags) {
    console.log(chalk.bold.cyan('Tags Skipped: '), argv.skiptags);
    runCmd = runCmd.concat(['--skiptags', `${argv.skiptags}`]);
  }

  if (argv.group) {
    console.log(chalk.bold.cyan('Groups Targetted: '), argv.group);
    runCmd = runCmd.concat(['--group', `${argv.group}`]);
  }

  if (argv.skipgroup) {
    console.log(chalk.bold.cyan('Groups Skipped: '), argv.skipgroup);
    runCmd = runCmd.concat(['--skipgroup', `${argv.skipgroup}`]);
  }

  // spawn nightwatch process
  const cwd = process.cwd();
  const spawnOpts = {
    cwd,
    stdio: [process.stdin, process.stdout, process.stderr],
  };

  // run the tests through npm (using local node_module/.bin)
  child = spawn(`${path.resolve(__dirname, '..')}/node_modules/.bin/nightwatch`, runCmd, spawnOpts);

  child.on('error', (err) => {
    if (childIsAlive) {
      child.kill();
      childIsAlive = false;
    }

    console.error(chalk.red('Failed to run tests'));
    throw new Error(err);
  });

  child.on('exit', (code) => {
    childIsAlive = false;
    childExitCode = code;
  });

  process.on('beforeExit', () => {
    process.exit(childExitCode);
  });
}

runTests();
