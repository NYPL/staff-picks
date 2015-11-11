const config = {
  apiRoot: 'https://refinery.nypl.org',
  apiEndpoint: '/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists',
  fields: 'fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&' +
    'fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri',
  pageSize: '&page[size]=1',
  includes: '&include=previous-list,next-list,picks.item.tags,picks.age',
  alertsApiUrl: 'https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all',
  api: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org'
    },
    baseEndpoint: '/api/nypl/ndo/v0.1/book-lists',
    bookListUserEndpoint: '/book-list-users',
    fields: '',
    // default setting is loading five items at first
    pageSize: '&page[size]=5',
    pageNumber: '&page[number]=1',
    includes: ['list-items.item', 'user']
  },
  headerApi: {
    endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
    includes: [
      'children',
      'related-mega-menu-panes.current-mega-menu-item.images',
      'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.current-mega-menu-item.related-content.location',
      'related-mega-menu-panes.default-mega-menu-item.images',
      'related-mega-menu-panes.default-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.default-mega-menu-item.related-content.location'
    ],
    filters: {
      'relationships': {'parent': 'null'}
    }
  },
  navTopLinks: [
    {
      id: '29a4b824-e084-4771-aafc-52b3586c5e49',
      link: {
        en: {
          text: '//www.nypl.org/browse',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Browse',
          type: 'text-single'
        }
      },
      sort: 105,
      type: 'header-item'
    },
    {
      id: '925d1fa9-1138-403c-9990-38861902b02d',
      link: {
        en: {
          text: '//www.nypl.org/learn',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Learn',
          type: 'text-single'
        }
      },
      sort: 106,
      type: 'header-item'
    },
    {
      id: '851ed351-08f5-43f0-9011-9c317f85f0ca',
      link: {
        en: {
          text: '//www.nypl.org/attend',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Attend',
          type: 'text-single'
        }
      },
      sort: 107,
      type: 'header-item'
    },
    {
      id: '4bd4f525-3f5c-4c45-b7a7-0ee6bbd301e9',
      link: {
        en: {
          text: '//www.nypl.org/research',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Research',
          type: 'text-single'
        }
      },
      sort: 108,
      type: 'header-item'
    },
    {
      id: 'df621833-4dd1-4223-83e5-6ad7f98ad26a',
      link: {
        en: {
          text: '//www.nypl.org/locations/map',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Find Us',
          type: 'text-single'
        }
      },
      sort: 109,
      type: 'header-item'
    },
    {
      id: '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1',
      link: {
        en: {
          text: '//www.nypl.org/give',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Give',
          type: 'text-single'
        }
      },
      sort: 110,
      type: 'header-item'
    },
    {
      id: '13d95ad5-f117-4415-ba2c-5c0b9618984d',
      link: {
        en: {
          text: '//www.nypl.org/get-help',
          type: 'text-single'
        }
      },
      name: {
        en: {
          text: 'Get Help',
          type: 'text-single'
        }
      },
      sort: 111,
      type: 'header-item'
    }
  ],
  socialMediaLinks: {
    facebook: 'https://www.facebook.com/nypl',
    twitter: 'https://twitter.com/nypl',
    instagram: 'https://instagram.com/nypl',
    tumblr: 'http://nypl.tumblr.com/',
    youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
    soundcloud: 'https://soundcloud.com/nypl'
  },
  donationLinks: [
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=55&s_src=FRQ16ZZ_TNN',
      amount: '$55'
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=115&s_src=FRQ16ZZ_TNN',
      amount: '$115'
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=250&s_src=FRQ16ZZ_TNN',
      amount: '$250'
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=0&s_src=FRQ16ZZ_TNN',
      amount: 'Other'
    }
  ],
  headerClientEnv: {
    production: 'https://header.nypl.org',
    qa: 'https://qa-header.nypl.org',
    development: 'https://dev-header.nypl.org'
  },
  myNyplLinks: {
    catalog: 'https://browse.nypl.org/iii/encore/myaccount',
    classic: 'https://catalog.nypl.org/patroninfo/top',
    moreInfo: 'https://www.nypl.org/online-catalog-changes'
  }
};


export default config;