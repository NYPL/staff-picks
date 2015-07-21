// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from 'components/Hero/HeroTitle/HeroTitle.jsx';
import BookIntro from 'components/Hero//BookIntro/BookIntro.jsx';
import HeroImage from 'components/Hero/HeroImage/HeroImage.jsx';
import BookStore from '../../stores/BookStore.js';

export default class Hero extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
      age: BookStore.getAge(),
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({
      age: BookStore.getAge()
    });
  }

  render() {
    var BookIntros = function (age) {   
      switch (age) { 
        case 'Adult':
          return (
          <BookIntro bookTitle={bookIntros.adult.bookTitle} 
          quote={bookIntros.adult.quote} /> );
        break;

        case 'YA':
          return (
          <BookIntro bookTitle={bookIntros.youngAdult.bookTitle} 
          quote={bookIntros.youngAdult.quote} /> );
        break;

        case 'Children':
          return (
          <BookIntro bookTitle={bookIntros.child.bookTitle} 
          quote={bookIntros.child.quote} /> );
        break;

        default:
      }
    }(this.state.age);

    var HeroImages = function (age) {
      switch (age) {
        case 'adult':
        return (<HeroImage src={src.HeroImageLink.adult} />);
        break;

        case 'youngAdult':
        return (<HeroImage src={src.HeroImageLink.youngAdult} />);
        break;

        case 'child':
        return (<HeroImage src={src.HeroImageLink.child} />);
        break;

        default:
      }
    }(this.state.age);
    
    return (
      <div key='Hero' style={styles.Hero}>
        <div key='HeroContainer' className='hero-container' style={styles.HeroContainer}>
          <div key='TextContainer' className='text-container' style={styles.TextContainer}>
            <HeroTitle title='staff picks' intro='NYPL&#39;s librarians share their all-time favorite reads each month. Explore their book selections by choosing a tag below.' />
            {BookIntros}
          </div>
          <div key='HeroImageContainer' className='hero-image-container' style={styles.HeroImageContainer}>
            {HeroImages}
          </div>
        </div>
      </div>
    );
  }
}

const bookIntros = {
  adult: {
    bookTitle: 'The Amazing Adventures of Kavalier & Clay',
    quote: '"I loved this book. It\'s a great story with complex, interesting characters in a fascinating setting. The creation of the comic book history is not only fascinating but the fictional elements are so well integrated that without looking it up."'
  },
  youngAdult: {
    bookTitle: 'The Six-Gun Tarot',
    quote: '"The wild--and weird--west! The strange town of Golgotha with its even stranger citizens isn\'t the sort of place to visit . . . but makes for great reading!"'
  },
  child: {
    bookTitle: 'The Whispering Skull',
    quote: '"Ghost-hunting, murder and mysteries, oh my! This second book in the author\'s Lockwood & Co. series delivers just as much suspenseful, spine-tingling action."'
  }
}

const styles = {
  Hero: {
    '@media (max-width: 767px)': { width: '100%' },
    height: 'auto',
    backgroundColor: '#CC1a16',
    color: 'white',
    minHeight: '72px',
    padding: '4% 15%',
  },
  HeroContainer: {
    '@media (max-width: 719px)': { margin: '50px 0 0 0' },
    height: 'auto',
    margin: '0 auto',
    maxWidth: '900px',
    overflow: 'auto',
    position: 'relative',
  },
  HeroImageContainer: {
    '@media (max-width: 1200px)': {  },
    '@media (min-width: 768px) and (max-width: 979px)': {  },
    '@media (max-width: 767px)': { display: 'none' },
    '@media (max-width: 480px)': { display: 'none' },
    borderRadius: '50%',
    display: 'block',
    float: 'right',
    margin: '20px',
    height: '275px',
    width: '275px',
    overflow: 'hidden',
    position: 'relative'
  },
  TextContainer: {
    '@media (max-width: 1200px)': { width: '50%' },
    '@media (min-width: 827px) and (max-width: 979px)': { width: '45%' },
    '@media (min-width: 768px) and (max-width: 826px)': { width: '40%' },
    '@media (min-wdith: 720px) and (max-width: 767px)': { width: '60%' },
    '@media (max-width: 719px)': { width: '60%', left: '10%' },

    float: 'left',
    position: 'relative',
    width: '60%'
  }
};

const src = {
  HeroImageLink: {
    adult: 'https://chicago.bibliocms.com/wp-content/uploads/sites/3/2015/01/kccover.png',
    youngAdult: 'http://manyatruenerd.com/wp-content/uploads/2013/09/sixgun2.jpeg',
    child: 'http://ecx.images-amazon.com/images/I/91U6ZmLmu4L.jpg'
  }
};

export default Radium(Hero);