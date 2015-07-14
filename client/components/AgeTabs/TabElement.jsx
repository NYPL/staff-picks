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
        <a href='#' style={styles.ElementLink} onClick={this.handleClick}>{this.props.name}</a>
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
      border: '1px solid #cc1a16',
      borderStyle: 'solid solid none solid',
      color: '#cc1a16',
      padding: '20px 5% 21px 5%'
    },
    ':hover': {
      border: '1px solid #cc1a16',
      borderStyle: 'solid solid none solid',
      color: '#cc1a16',
      padding: '20px 5% 21px 5%'
    },
    backgroundColor: '#ffffff',
    border: '1px solid #cc1a16',
    borderStyle: 'none none solid none',
    color: '#bfbfbf',
    padding: '20px 5%',
    textDecoration: 'none',
    width: 'auto'
  }
}

export default Radium(TabElement);