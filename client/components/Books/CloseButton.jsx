import React from 'react';
import Radium from 'radium';

import SimpleButton from 'components/Buttons/SimpleButton.jsx';

class CloseButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick (e) {
    e.preventDefault();
    this.props.onClick();
  }

  render () {
    return (
      <SimpleButton style={styles.CloseButton}
        id='close-button' 
        label='RETURN TO STAFF PICKS'
        onClick={this._handleClick} />
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
      color: 'rgba(191, 191, 191, 1)',
      float: 'left', 
      fontSize: '1.3em',
      height: 'auto',
      margin: '0 0 20px 0',
      padding: '5px 4px 30px 36px',
      width: '100%' 
    },
    backgroundImage: 'url("/client/images/icons/gray_x_button.svg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'rgba(191, 191, 191, 0)',
    cursor: 'pointer',
    float: 'right',
    fontSize: '24px',
    height: '28px',
    margin: '-16px -6px 0 0',
    overflow: 'hidden',
    textDecoration: 'none',
    width: '28px'
  }
};

export default Radium(CloseButton);