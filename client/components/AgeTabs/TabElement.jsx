import React from 'react';
import Radium from 'radium';

class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  render () {
  	return (
  		<li key={`tab-${this.props.name}`} className='tab-element' style={styles.TabElement}>
        {this.props.name}
  		</li>
		);
  }
};

const styles = {
  TabElement: {
    display: 'inline',
    margin: '0 10%',
    textTransform: 'uppercase'
  }
}

export default Radium(TabElement);