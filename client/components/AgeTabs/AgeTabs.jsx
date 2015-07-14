import React from 'react';
import Radium from 'radium';

import TabElement from 'components/AgeTabs/TabElement.jsx'

class AgeTabs extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  render () {
    var TabElements = data.map ( function (element) {
      return (
        <TabElement key={element.name} id={element.name} className='tab-elements' name={element.name} />
      );
    });
  	return (
  		<div key='age-tabs' className='age-tabs' style={styles.TabContainer} >
        <ul style={styles.TabContainer.ul}>
          {TabElements}
        </ul>
  		</div>
		);
  }
};

const styles = {
  TabContainer: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #cc1a16',
    color: '#cc1a16',
    display: 'block',
    fontSize: '16px',
    margin: '25px 0 0 0',
    width: '100%',
    height: '50px',
    ul : {
      display: 'block',
      margin: '0 auto',
      position: 'relative'
    }
  }
};

const data = [
  { name: 'adult' },
  { name: 'youngAdult' },
  { name: 'child' }
];

export default Radium(AgeTabs);