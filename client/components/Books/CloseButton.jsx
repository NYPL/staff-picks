// Import React and related libraries

import React from 'react';
import Radium from 'radium';

// Create the class
class CloseButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <a style={styles.CloseButton} id='close-button' label=''
        onClick={this.props.onClick}> 
        RETURN TO STAFF PICKS
      </a>
    );
  }
}

// Styles
const styles = {
  CloseButton: { 
    '@media (max-width: 414px)': { 
      backgroundImage: 'url("/client/images/icons/left_arrow_gray.svg")',
      backgroundPosition: '0 0',
      borderBottomStyle: 'solid',
      borderColor: '#cc1a16',
      borderLeftStyle: 'none',
      borderRightStyle: 'none',
      borderTopStyle: 'none',
      borderWidth: '1px',
      float: 'left', 
      fontSize: '1.3em',
      height: 'auto',
      margin: '0 0 20px 0',
      padding: '5px 0 30px 40px',
      width: '100%' ,
      ':hover': {color: '#bfbfbf'}
    },
    backgroundImage: 'url("/client/images/icons/gray_x_button.svg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#bfbfbf',
    cursor: 'pointer',
    float: 'right',
    fontSize: '24px',
    height: '28px',
    margin: '-16px -6px 0 0',
    textDecoration: 'none',
    width: '28px',
    ':hover': {color: '#000000'}
  }
};

export default Radium(CloseButton);