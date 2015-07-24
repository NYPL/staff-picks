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
      <div className='tab-container' 
        style={styles.TabContainer}>
        <ul className='tab-ul' style={styles.TabUl}>
          {TabElements}
        </ul>
      </div>
		);
  }
};

const styles = {
  TabContainer: {
    '@media (max-width: 1200px)': {  },
    '@media (min-width: 768px) and (max-width: 979px)': {  },
    '@media (max-width: 767px)': { padding: '20px 10% 0 10%' },
    '@media (max-width: 414px)': { fontSize: '1.2em', padding: '0 0 0 0' },
    backgroundColor: '#ffffff',
    borderColor: '#cc1a16',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
    display: 'block',
    fontSize: '1.4em',
    height: 'auto',
    margin: '30px auto 40px',
    padding: '20px 15% 0 15%',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  TabUl: {

  }
};

const data = [
  { name: 'adult', value: 'Adult' },
  { name: 'young adult', value: 'YA' },
  { name: 'children', value: 'Children' }
];

export default Radium(AgeTabs);