// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from 'components/Hero/HeroTitle/HeroTitle.jsx';
import BookIntro from 'components/Hero//BookIntro/BookIntro.jsx';
import HeroImage from 'components/Hero/HeroImage/HeroImage.jsx';
import BookStore from '../../stores/BookStore.js';
import API from '../../utils/ApiService.js';

var featuredBooks = API.getFeaturedPicks();

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
      return (
        <BookIntro bookTitle={featuredBooks[age]['staff-pick-item']['attributes']['title']}
          quote={featuredBooks[age]['attributes']['text']} /> 
      );
    }(this.state.age);

    var HeroImages = function (age) {
      let imageSlug = featuredBooks[age]['staff-pick-item']['attributes']['image-slug']
      let src = '/client/images/staff_pic_bg.jpg';
      return (<HeroImage src={src} />);
    }(this.state.age);
    
    return (
      <div key='Hero' style={styles.Hero}>
        <div key='HeroContainer' className='hero-container' style={styles.HeroContainer}>
          <div key='TextContainer' className='text-container' style={styles.TextContainer}>
            <HeroTitle title='staff picks' des='Every month NYPL&#39;s librarians share their favorite reads.' 
            intro='Explore their book selections—ranging from new releases to timeless classics—by choosing a tag below.'/>
          </div>
          <div key='HeroImageContainer' className='hero-image-container' style={styles.HeroImageContainer}>
            {HeroImages}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  Hero: {
    '@media (max-width: 767px)': { width: '100%' },
    height: 'auto',
    backgroundColor: '#e4382c',
    color: 'white',
    minHeight: '72px',
    padding: '0',
  },
  HeroContainer: {
    '@media (max-width: 719px)': { margin: '50px 0 0 0' },
    height: 'auto',
    margin: '0 auto',
    maxWidth: '900px',
    overflow: 'hidden',
    position: 'relative',
  },
  HeroImageContainer: {
    '@media (max-width: 1200px)': { },
    '@media (min-width: 768px) and (max-width: 979px)': { display: 'none' },
    '@media (max-width: 767px)': { display: 'none' },
    '@media (max-width: 414px)': { display: 'none' },
    borderRadius: '50%',
    display: 'block',
    margin: '-90px 0 -6px 0',
    height: '430px',
    width: '430px',
    overflow: 'hidden',
    position: 'relative'
  },
  TextContainer: {
    '@media (max-width: 1200px)': { width: '45%' },
    '@media (min-width: 827px) and (max-width: 979px)': { width: '45%' },
    '@media (min-width: 768px) and (max-width: 826px)': { width: '40%' },
    '@media (min-wdith: 720px) and (max-width: 767px)': { width: '60%' },
    '@media (max-width: 719px)': { width: '60%', left: '10%' },
    float: 'left',
    margin:'70px 0 40px 60px', 
    position: 'relative',
    width: '45%'
  }
};

export default Radium(Hero);