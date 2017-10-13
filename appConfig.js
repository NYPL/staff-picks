const config = {
  port: 3001,
  webpackDevServerPort: 3000,
  apiRoot: 'https://refinery.nypl.org',
  apiEndpoint: '/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists',
  fields: 'fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&' +
    'fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri',
  pageSize: '&page[size]=1',
  includes: '&include=previous-list,next-list,picks.item.tags,picks.age',
  api: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
    baseEndpoint: '/api/nypl/ndo/v0.1/book-lists',
    bookListUserEndpoint: '/book-list-users',
    fields: '',
    // default setting is loading five items at first
    pageSize: '&page[size]=5',
    pageNumber: '&page[number]=1',
    includes: ['list-items.item', 'user'],
  },
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
};

export default config;
