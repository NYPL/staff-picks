// Import React and related libraries
import React from 'react';
import Radium from 'radium';

// Import components
import TabElement from 'components/AgeTabs/TabElement.jsx';

// Create the class
class AgeTabs extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    // Render each TabElement
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
        <ul style={styles.TabUl}>
          <li key='li-before' style={styles.TabOutside}></li>
          {TabElements}
          <li key='li-after' style={styles.TabOutside}></li>
        </ul>
      </div>
		);
  }
};

// Styles
const styles = {
  TabContainer: {
    '@media (max-width: 767px)': { fontSize: '1.2em', padding: '20px 0 0 0' },
    backgroundColor: '#ffffff',
    display: 'block',
    fontSize: '1.4em',
    height: 'auto',
    margin: '30px auto 40px',
    padding: '20px 0 0 0',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  TabUl: {
    display: 'block',
    margin: '0 auto',
  },
  TabOutside: {
    '@media (max-width: 767px)': { width: '0' },
    display: 'inline-block',
    textTransform: 'uppercase',
    width: '15%',
    borderBottomStyle: 'solid',
    borderColor: '#cc1a16',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
    position: 'relative',
    top:'23px'
  }
};

// contents and values for each TabElement
const data = [
  { name: 'adult', value: 'Adult' },
  { name: 'young adult', value: 'YA' },
  { name: 'children', value: 'Children' }
];

export default Radium(AgeTabs);