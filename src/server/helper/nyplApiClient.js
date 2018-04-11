import config from '../../../appConfig';

import kmsClientHelper from './kmsClientHelper';

const appEnvironment = process.env.APP_ENV || 'production';
const options = {
  kmsEnvironment: process.env.KMS_ENV || 'encrypted',
  clientId: process.env.clientId || '',
  clientSecret: process.env.clientSecret || '',
  apiBase: config.api[appEnvironment],
  tokenUrl: config.tokenUrl,
};

export default kmsClientHelper(options);
