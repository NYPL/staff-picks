// Library import
import React from 'react';
import Radium from 'radium';

// Component import
import HeroTitle from 'components/Hero/HeroTitle/HeroTitle.jsx';
import BookIntro from 'components/Hero//BookIntro/BookIntro.jsx';
import HeroImage from 'components/Hero/HeroImage/HeroImage.jsx';

export default class Hero extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <div key='Hero' className='Hero' style={styles.Hero}>
        <div key='HeroContainer' className='HeroContainer' style={styles.HeroContainer}>
          <div key='TextContainer' className='TextContainer' style={styles.TextContainer}>
            <HeroTitle title='staff picks' intro='NYPL&#39;s librarians share their favorite reads each month. Explore their book selections by choosing a tag below.' />
            <BookIntro bookTitle='The Amazing Adventures of Kavalier & Clay' quote='"I loved this book. It&#39;s a great story with complex, interesting characters in a fascinating setting. The creation of the comic book history is not only fascinating but the fictional elements are so well integrated that without looking it up."' />  
          </div>
          <div key='HeroImageContainer' className='HeroImageContainer' style={styles.HeroImageContainer}>
            <HeroImage />
          </div>
        </div>
      </div>
    );
  }
}

Hero.defaultProps = {

};


const styles = {
  Hero: {
    backgroundColor: '#CC1a16',
    color: 'white',
    minHeight: '72px',
    padding: '4% 15%',
    width: '70%'
  },
  HeroContainer: {
    height: 'auto',
    margin: '0 auto',
    maxWidth: '900px',
    overflow: 'auto',
    position: 'relative',
  },
  HeroImageContainer: {
    '@media (max-width: 568px)': { display: 'none' },
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
    float: 'left',
    position: 'relative',
    width: '60%'
  }
};

export default Radium(Hero);