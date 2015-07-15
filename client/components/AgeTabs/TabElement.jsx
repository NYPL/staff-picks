import React from 'react';
import Radium from 'radium';

class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
  	return (
  		<li key={`tab-${this.props.name}`} id={this.props.name} className='tab-element' style={styles.TabElement}>
        <a style={styles.ElementLink} onClick={this.props.clickFn}>{this.props.name}</a>
  		</li>
		);
  }
};

const styles = {
  TabElement: {
    display: 'inline',
    margin: '0',
    textTransform: 'uppercase',
    whiteSpace: 'pre',
  },
  ElementLink: {
    ':active': {
      borderColor: '#cc1a16',
      borderBottomStyle: 'none',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderWidth: '1px',
      color: '#cc1a16',
      padding: '20px 5% 21px 5%'
    },
    ':hover': {
      borderColor: '#cc1a16',
      borderBottomStyle: 'none',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderWidth: '1px',
      color: '#cc1a16',
      padding: '20px 5% 21px 5%'
    },
    backgroundColor: '#ffffff',
    borderColor: '#cc1a16',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
    color: '#bfbfbf',
    padding: '20px 5%',
    textDecoration: 'none',
    width: 'auto'
  }
}

export default Radium(TabElement);