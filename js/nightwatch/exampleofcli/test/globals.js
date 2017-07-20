/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
/* eslint-enable import/no-extraneous-dependencies */

chai.use(chaiAsPromised);

global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();
