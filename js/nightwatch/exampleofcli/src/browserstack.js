const https = require('https');
const chalk = require('chalk');
require('dotenv').config({ silent: true }); // eslint-disable-line global-require

/*
  run through browser stack so need to check if browser stack has a session available
  note: if you get a "HTTP Basic: Access denied"
  this means you have not set the appropriate environment variables
  BROWSERSTACK_USER and BROWSERSTACK_KEY in particular */
const options = {
  hostname: 'www.browserstack.com',
  path: '/automate/plan.json',
  port: 443,
  auth: `${process.env.BROWSERSTACK_USER}:${process.env.BROWSERSTACK_KEY}`,
  method: 'GET',
};

/* eslint-disable import/prefer-default-export */
export function checkSessions() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');

      res.on('data', (data) => {
        const json = JSON.parse(data);
        console.log(chalk.bold.cyan('Browserstack sessions running: '),
          json.parallel_sessions_running);
        console.log(chalk.bold.cyan('Browserstack max sessions allowed: '),
          json.team_parallel_sessions_max_allowed);

        if (json.parallel_sessions_running < json.team_parallel_sessions_max_allowed) {
          resolve(true);
        } else {
          console.error(chalk.red('Too many browserstack sessions running'));
          reject(false);
        }
      });
    });
    req.end();

    req.on('error', (error) => {
      console.error(chalk.red('Error occured while checking browserstack site: ', error));
      reject(false);
    });
  }).catch((error) => {
    console.error(chalk.red(`Error occured: ${error}`));
  });
}

