const chalk = require('chalk');
const http = require('http');
const https = require('https');

const healthMaxAttempts = 20;
const healthWaitTimeMilliseconds = 15000; // every 15 seconds
let healthAttempts = 0;

function testHealth(resolve, reject, healthEndpoint) {
  console.log(chalk.bold.cyan('Checking health endpoint: '), healthEndpoint);
  healthAttempts++;

  // test health is available before running tests
  (healthEndpoint.startsWith('https://') ? https : http).get(`${healthEndpoint}`, (res) => {
    if (res.statusCode !== 200) {
      console.error(
        chalk.red(`Failed to contact server at: ${healthEndpoint}`));
      console.error(chalk.red(`Status Code: ${res.statusCode}`));

      if (healthAttempts >= healthMaxAttempts) {
        console.error(chalk.red('Max Attempts Exceeded'));
        reject(false);
      } else {
        setTimeout(() => {
          testHealth(resolve, reject, healthEndpoint);
        }, healthWaitTimeMilliseconds);
      }
    } else {
      console.log(chalk.bold.cyan('Health OK'));
      resolve(true);
    }
  }).on('error', (err) => {
    console.error(chalk.red(err));
    if (healthAttempts >= healthMaxAttempts) {
      console.error(chalk.red('Max Attempts Exceeded'));
      reject(false);
    } else {
      setTimeout(() => {
        testHealth(resolve, reject, healthEndpoint);
      }, healthWaitTimeMilliseconds);
    }
  });
}

/* eslint-disable import/prefer-default-export */
export function healthCheck(healthEndpoint) {
  return new Promise((resolve, reject) => {
    testHealth(resolve, reject, healthEndpoint);
  }).catch((error) => {
    console.error(chalk.red(`Error occured: ${error}`));
  });
}
