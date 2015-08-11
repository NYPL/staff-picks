// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from './HeroTitle/HeroTitle.jsx';
import HeroImage from './HeroImage/HeroImage.jsx';
import BookStore from '../../stores/BookStore.js';
import API from '../../utils/ApiService.js';

class Hero extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {    
    return (
      <div key='Hero' style={styles.Hero}>
        <div key='HeroContainer' className='hero-container' style={styles.HeroContainer}>
          <div key='TextContainer' className='text-container' style={styles.TextContainer}>
            <HeroTitle title='staff picks' des='Every month NYPL&#39;s librarians share their favorite reads.' 
            intro='Explore their book selections—ranging from new releases to timeless classics—by choosing a tag below.'/>
          </div>
        </div>
      </div>
    );
  }
};

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
    '@media (min-width: 719px)': { margin: '0 auto' },
    height: 'auto',
    margin: '50px 0 0 0',
    maxWidth: '900px',
    overflow: 'hidden',
    position: 'relative',
  },
  HeroImageContainer: {
    '@media (min-width: 1200px)': { display: 'block' },
    '@media (min-width: 767px)': { display: 'block' },
    borderRadius: '50%',
    display: 'none',
    margin: '-90px 0 -6px 0',
    height: '430px',
    width: '430px',
    overflow: 'hidden',
    position: 'relative'
  },
  TextContainer: {
    '@media (max-width: 1200px)': { width: '45%' },
    '@media (min-width: 827px) and (max-width: 979px)': { width: '40%' },
    '@media (min-width: 768px) and (max-width: 826px)': { width: '35%' },
    '@media (min-width: 720px) and (max-width: 767px)': { width: '60%' },
    '@media (max-width: 719px)': { width: '60%', left: '10%' },
    '@media (max-width: 414px)': { margin:'4px 0 0 5px' },
    float: 'left',
    margin: '70px 0 40px 60px',
    position: 'relative',
    width: '45%'
  }
};

// const styles = {
//   Hero: {
//     height: 'auto',
//     backgroundColor: '#e4382c',
//     color: 'white',
//     minHeight: '72px',
//     padding: '0',
//     '@media (min-width: 767px)': { width: '100%' }
//   },
//   HeroContainer: {
//     height: 'auto',
//     margin: '50px 0 0 0',
//     maxWidth: '900px',
//     overflow: 'hidden',
//     position: 'relative',
//     '@media (min-width: 719px)': { margin: '0 auto' }
//   },
//   HeroImageContainer: {
//     display: 'none',
//     borderRadius: '50%',
//     margin: '-90px 0 -6px 0',
//     height: '400px',
//     width: '400px',
//     overflow: 'hidden',
//     position: 'relative',
//     '@media (min-width: 767px)': { 
//       display: 'block'
//     },
//   },
//   TextContainer: {
//     margin:'4px 0 0 5px',
//     float: 'left',
//     position: 'relative',
//     width: '45%',
//     '@media (min-width: 415px)': { margin:'70px 0 40px 50px' },
//     '@media (min-width: 768px) and (max-width: 826px)': { width: '40%' },
//     '@media (min-width: 827px) and (max-width: 979px)': { width: '45%' },
//     '@media (min-width: 720px) and (max-width: 767px)': { width: '45%' },
//     '@media (min-width: 1200px)': { width: '45%' }
//   }
// };

export default Radium(Hero);
