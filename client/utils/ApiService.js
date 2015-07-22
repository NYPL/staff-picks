// A simple API object with a getData() method.
// Ideally, the data reciceved SHOULD be added to our
// Application Store. That will be the central single point
// of reference for our data. For now, returning it and passing
// it to the component.

const API = {
  getData() {
    const data = JSON.parse(localStorage.getItem('header-data'));
    return data;
  },
  getBooks() {
    const books = staffPicks;
    console.log(books);
    return books;
  },
  getFilters() {
    const filterList = filters.filters;
    return filterList;
  },
  getHero () {
    const heroIntros = {
      adult: {
        bookTitle: 'The Amazing Adventures of Kavalier & Clay',
        quote: '"I loved this book. It\'s a great story with complex, interesting characters in a fascinating setting. The creation of the comic book history is not only fascinating but the fictional elements are so well integrated that without looking it up."',
        imageLink: 'https://chicago.bibliocms.com/wp-content/uploads/sites/3/2015/01/kccover.png'
      },
      youngAdult: {
        bookTitle: 'The Six-Gun Tarot',
        quote: '"The wild--and weird--west! The strange town of Golgotha with its even stranger citizens isn\'t the sort of place to visit . . . but makes for great reading!"',
        imageLink: 'http://manyatruenerd.com/wp-content/uploads/2013/09/sixgun2.jpeg'
      },
      child: {
        bookTitle: 'The Whispering Skull',
        quote: '"Ghost-hunting, murder and mysteries, oh my! This second book in the author\'s Lockwood & Co. series delivers just as much suspenseful, spine-tingling action."',
        imageLink: 'http://ecx.images-amazon.com/images/I/91U6ZmLmu4L.jpg'
      }
    }
    return heroIntros; 
  }
};

export default API;