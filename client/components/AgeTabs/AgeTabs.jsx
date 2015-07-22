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
        <TabElement 
          key={element.name} 
          id={element.name} 
          name={element.name} 
          value={element.value} />
      );
    });
  	return (
      <ul className='tab-ul' 
        style={styles.TabContainer}>
        {TabElements}
      </ul>
		);
  }
};

const styles = {
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
    margin: '40px auto 40px',
    padding: '20px 0 21px 0',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  }
};

const data = [
  { name: 'adult', value: 'Adult' },
  { name: 'young adult', value: 'YA' },
  { name: 'child', value: 'Children' }
];

export default Radium(AgeTabs);