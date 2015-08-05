// A simple API object with a getData() method.
// Ideally, the data reciceved SHOULD be added to our
// Application Store. That will be the central single point
// of reference for our data. For now, returning it and passing
// it to the component.
import _ from 'underscore';

var staffPicksServer, filtersServer, pickListServer;

const API = {
  setStaffPick(picks) {
    staffPicksServer = picks;
  },
  setFilters(filters) {
    filtersServer = filters;
  },
  setPickList(list) {
    pickListServer = list;
  },
  getData() {
    const data = [
      {
        label: { en: 'Browse' },
        subnav: [
          {
            label: { en: 'Borrow Books/Music/DVDs' },
            target: 'http://nypl.bibliocommons.com'
          },
          {
            label: { en: 'Recommendations' }
          },
          {
            label: { en: 'Blogs' },
            target: 'blog'
          },
          {
            label: { en: 'Projects' }
          }
        ],
        features: [
          {
            tag: 'Recommendation',
            title: 'Our Suggestions for Facebook\'s "A Year of Books"',
            desc: 'Lynn Lobash, Manager of Reader Services',
            link: 'http://www.nypl.org/blog/2015/02/03/suggestions-facebook-year-reading'
          },
          {
            tag: 'Blog',
            title: 'We All Scream for Ice Cream: Books and Resources for Making Your Own',
            desc: 'Lauren Lampasone, Digital Experience',
            link: 'http://www.nypl.org/blog/2015/05/05/ice-cream-books-resources'
          }
        ]
      },
      {
        label: { en: 'Learn' },
        subnav: [
          {
            label: { en: 'Classes' }
          },
          {
            label: { en: 'Community Services' }
          },
          {
            label: { en: 'School Services' }
          }
        ],
        features: [
          {
            tag: 'Classes',
            title: 'Learn English',
            desc: 'Join a free ESOL, English conversation, or adult literacy class at a library location near you. ',
            link: 'http://www.nypl.org/events/classes/english',
            image: 'http://fpoimg.com/88x88'
          },
          {
            tag: 'Classes',
            title: 'TechConnect',
            desc: 'Find technology classes at libraries throughout the Bronx, Manhattan, and Staten Island—all absolutely free.',
              link: 'http://www.nypl.org/tech-connect',
            image: 'http://fpoimg.com/88x88'
          }
        ]
      },
      {
        label: { en: 'Attend' },
        subnav: [
          {
            label: { en: 'Events' },
            target: 'events/public-programs'
          },
          {
            label: { en: 'Exhibitions' },
            target: 'events/exhibitions'
          },
          {
            label: { en: 'Tours' },
            target: 'events/tours'
          }
        ],
        features: [
          {
            tag: 'Event',
            title: 'Werner Herzog & Paul Holdengräber',
            desc: 'June 16, 7pm, Schwarzman Building LIVE from the NYPL welcomes back legendary filmmaker Werner Herzog for a conversation about Ancient Greek literature and history.',
            link: 'http://www.nypl.org/events/programs/2015/06/16/werner-herzog-paul-holdengr%C3%A4ber',
            image: 'http://fpoimg.com/88x88'
          },
          {
            tag: 'Exhibition',
            title: 'Curators\' Choice: Black Life Matters',
            desc: 'On now, Schomburg Center Curators’ Choice: Black Life Matters features an eclectic array of items that affirm the Schomburg Center’s mission.',
            image: 'http://fpoimg.com/88x88'
          }
        ]
      },
      {
        label: { en: 'Find Us' },
        target: 'locations',
        subnav: [
          {
            label: { en: 'All Locations' },
            target: 'locations'
          },
          {
            label: { en: 'Research Libraries' }
          }
        ],
        features: [
          {
            tag: "(Widget)",
            title: "Find a library"
          },
          {
            tag: "Location Spotlight",
            title: "George Bruce Library Celebrates 100 Years",
            desc: "The original George Bruce Library was located on 42nd Street. When that building was sold in 1915, the proceeds were used to build the present-day building on 125th Street.",
            image: 'http://fpoimg.com/88x88'
          }
        ]
      },
      {
        label: { en: 'Research' },
        subnav: [
          {
            label: { en: 'Catalogs' }
          },
          {
            label: { en: 'Information' }
          },
          {
            label: { en: 'Services' }
          }
        ],
        features: [
          {
            tag: "Catalog",
            title: "Digital Collections",
            desc: "Access more than 800,000 images digitized from the New York Public Library's collections including historical maps, vintage posters, photographs, and more.",
            link: "//digitalcollections.nypl.org",
            image: 'http://fpoimg.com/88x88'    
          },
          {
            tag: "Information",
            title: "Plan Your Research Visit",
            desc: "Learn about 6 time-saving thing you can do before you arrive at the Schwarzman Building, Library for Performing Arts, or Schomburg Center to conduct research.",
            link: "http://www.nypl.org/about/locations/using-the-library/plan-your-research-visit",
            image: 'http://fpoimg.com/88x88'
          }
        ]
      },
      {
        label: { en: 'Give' },
        target: 'support',
        subnav: [
          {
            label: { en: 'Give' },
            target: 'support/donate'
          },
          {
            label: { en: 'Volunteer' },
            target: 'help/about-nypl/volunteer-nypl'
          }
        ],
        features: [
          {
            tag: "(Widget)",
            title: "Donate Now!",
            desc: "Support NYPL in its mission to inspire lifelong learning, advance knowledge, and strengthen our communities."
          },
          {
            tag: "Event",
            title: "Support NYPL in its mission to inspire lifelong learning, advance knowledge, and strengthen our communities.",
            desc: "April 25, 8pm, Schwarzman Building Honoring the best of today's young writers, YLFAB features dancing, cocktails, and light fare in historic Astor Hall.",
            image: 'http://fpoimg.com/88x88'
          }
        ]
      },
      {
        label: { en: 'Get Help' },
        target: 'ask-nypl',
        subnav: [
          {
            label: { en: 'Your Library Card' },
            target: 'help/library-card'
          },
          {
            label: { en: 'How to…' }
          },
          {
            label: { en: 'ASK NYPL' },
            target: 'ask-nypl'
          }
        ],
        features: [
          {
            tag: "Information",
            title: "Get a Library Card",
            desc: "Anyone who lives, works, attends school, or pays property taxes in New York can get a free library card.",
            link: "http://www.nypl.org/help/library-card",
            image: 'http://fpoimg.com/88x88'
          },
          {
            tag: "How to...",
            title: "Download an E-Book",
            desc: "Learn to download e-books, audiobooks, music, videos, talking picture books, and more.",
            link: "http://www.nypl.org/ask-nypl/ebookcentral",
            image: 'http://fpoimg.com/88x88'
          }
        ]
      }
    ];
    // store it in the HeaderStore
    return data;
  },
  getBooks() {
    if (staffPicksServer) {
      return staffPicksServer['staff-picks'];
    }
    let staffPicks = {'staff-picks': []};
    const books = staffPicks['staff-picks'] || [];
    return books;
  },
  getFilters() {
    let filters = {'filters':[]};
    const filterList = filtersServer.filters;
    return filterList;
  },
  getFeaturedPicks() {
    let pickList = {'staff-picks-list': []};
    const featuredPickList = pickListServer['staff-picks-list'];
    const featuredBooks = featuredPickList[0].relationships.features.data;

    let booksRaw = [], books = {};

    _.each(featuredBooks, function (book) {
      booksRaw.push(_.findWhere(staffPicks['staff-picks'], book));
    });

    _.each(booksRaw, function (book) {
      let age = book['staff-pick-age']['attributes']['age'];
      books[age] = book;
    });
    return books;
  }
};

export default API;