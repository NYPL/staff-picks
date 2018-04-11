import config from '../../../appConfig.js';
import platformConfig from '../../../platformConfig.js';
import kmsClientHelper from './kmsClientHelper';

const appEnvironment = platformConfig.appEnv || 'production';
const options = {
  kmsEnvironment: platformConfig.kmsEnvironment || 'encrypted',
  clientId: platformConfig.clientId || '',
  clientSecret: platformConfig.clientSecret || '',
  apiBase: config.api[appEnvironment],
  tokenUrl: platformConfig.tokenUrl,
};

export default kmsClientHelper(options);
