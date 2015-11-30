// Import React and related libraries
import React from 'react';
import Radium from 'radium';

// Import components
import TabElement from './TabElement.jsx';

// Create the class
class AgeTabs extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    // Render each TabElement
    let TabElements = data.map((element) => {
        return (
          <TabElement
            key={element.name}
            id={element.name}
            name={element.name}
            value={element.value} />
        );
      });

  	return (
      <div className='tab-container'>
        <ul className='tab-container__ul'>
          <li key='li-before' className='tab-container__outsider'></li>
          {TabElements}
          <li key='li-after' className='tab-container__outsider'></li>
        </ul>
      </div>
		);
  }
};

// contents and values for each TabElement
const data = [
  { name: 'adult', value: 'Adult' },
  { name: 'young adult', value: 'YA' },
  { name: 'children', value: 'Children' }
];

export default Radium(AgeTabs);
