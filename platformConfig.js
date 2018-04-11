// Read local .env file. The environment variables will be assigned with process.env in the beginning
import dotEnv from 'dotenv';
dotEnv.config();

const platformConfig = {
  loginUrl: 'https://login.nypl.org/auth/login',
  tokenUrl: 'https://isso.nypl.org/',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  appEnv: process.env.APP_ENV,
  kmsEnvironment: process.env.KMS_ENV,
};

export default platformConfig;
