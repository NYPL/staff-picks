import React from 'react';
import Radium from 'radium';

import SimpleButton from 'components/Buttons/SimpleButton.jsx';

class CloseButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick () {

  }

  render () {
  	return (
			<SimpleButton style={styles.CloseButton}
										id='close-button' 
										label=''
										onClick={this.props.onClick} />
		);
  }
}

const styles = {
  CloseButton: {
  	backgroundImage: 'url("/client/images/icons/gray_x_button.svg")',
  	backgroundPosition: 'center',
  	backgroundRepeat: 'no-repeat',
		color: '#bfbfbf',
		clear: 'both',
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