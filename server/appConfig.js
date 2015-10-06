const config = {
  apiRoot: 'https://qa-refinery.nypl.org',
  apiEndpoint: '/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists',
  fields: 'fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&' +
    'fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri',
  pageSize: '&page[size]=1',
  includes: '&include=previous-list,next-list,picks.item.tags,picks.age'
};


export default config;