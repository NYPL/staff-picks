import React from 'react';
import Radium from 'radium';

import SimpleButton from 'components/Buttons/SimpleButton.jsx';

class CloseButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick (age) {

  }

  render () {
  	return (
  		<div>
				<SimpleButton style={styles.CloseButton} 
											label='X' 
											onClick={this._handleClick.bind(this)} />
			</div>
		);
  }
}

const styles = {
  CloseButton: {
		color: '#bfbfbf',
		clear: 'both',
		float: 'right',
		fontSize: '20px',
		margin: '-20px 0 40px -10px',
		textDecoration: 'none',
		':hover': {color: '#000000'}
  }
};

export default Radium(CloseButton);