import config from '../../../appConfig.js';

import kmsClientHelper from './nyplApiClientHelper';

const appEnvironment = process.env.APP_ENV || 'production';
const kmsEnvironment = process.env.KMS_ENV || 'encrypted';
const apiBase = config.api[appEnvironment];

export default kmsClientHelper(appEnvironment, kmsEnvironment, apiBase, config.tokenUrl);
