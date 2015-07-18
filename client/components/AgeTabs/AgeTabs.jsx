import React from 'react';
import Radium from 'radium';

import TabElement from 'components/AgeTabs/TabElement.jsx';

class AgeTabs extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    var _this = this;
    var TabElements = data.map ( function (element) {
      return (
        <TabElement key={element.name} id={element.name} className='tab-elements' name={element.name} 
          value={element.state} />
      );
    });
  	return (
      <nav style={styles.Nav}>
        <ul className='tab-ul' style={styles.TabContainer}>
          {TabElements}
        </ul>
      </nav>
		);
  }
};

const styles = {
  Nav: {
    overflow: 'hidden'
  },
  TabContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#cc1a16',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
    display: 'block',
    fontSize: '16px',
    height: 'auto',
    margin: '40px auto 5px',
    padding: '20px 0 21px 0',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  }
};

const data = [
  { name: 'adult', state: '.Adult' },
  { name: 'young adult', state: '.YA' },
  { name: 'child', state: '.Children' }
];

export default Radium(AgeTabs);