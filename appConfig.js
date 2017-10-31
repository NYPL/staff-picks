const config = {
  port: 3001,
  webpackDevServerPort: 3000,
  baseUrl: '/books-music-dvds/recommendations/staff-picks/',
  baseApiUrl: '/books-music-dvds/recommendations/staff-picks/api/',
  baseAnnualUrl: '/books-music-dvds/recommendations/best-books/',
  baseMonthUrl: '/books-music-dvds/recommendations/staff-picks/',
  metaTags: [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Recommendations | The New York Public Library' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@nypl' },
    { name: 'twitter:creator', content: '@nypl' },
  ],
  seasons: {
    Spring: ['March', 'April', 'May'],
    Summer: ['June', 'July', 'August'],
    Fall: ['September', 'October', 'November'],
    Winter: ['December', 'January', 'February'],
  },
  recommendationsLink: {
    url: 'https://www.nypl.org/books-music-dvds/recommendations',
    label: 'Recommendations',
  },
  publicKey:
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA44ilHg/PxcJYsISHMRyo\n' +
    'xsmez178qZpkJVXg7rOMVTLZuf05an7Pl+lX4nw/rqcvGQDXyrimciLgLkWu00xh\n' +
    'm6h6klTeJSNq2DgseF8OMw2olfuBKq1NBQ/vC8U0l5NJu34oSN4/iipgpovqAHHB\n' +
    'GV4zDt0EWSXE5xpnBWi+w1NMAX/muB2QRfRxkkhueDkAmwKvz5MXJPay7FB/WRjf\n' +
    '+7r2EN78x5iQKyCw0tpEZ5hpBX831SEnVULCnpFOcJWMPLdg0Ff6tBmgDxKQBVFI\n' +
    'Q9RrzMLTqxKnVVn2+hVpk4F/8tMsGCdd4s/AJqEQBy5lsq7ji1B63XYqi5fc1SnJ\n' +
    'EQIDAQAB\n' +
    '-----END PUBLIC KEY-----',
  api: {
    development: 'https://api.nypltech.org/api/v0.1',
    production: 'https://platform.nypl.org/api/v0.1',
  },
  loginUrl: 'https://login.nypl.org/auth/login',
  tokenUrl: 'https://isso.nypl.org/',
};

export default config;
