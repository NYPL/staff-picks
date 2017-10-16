// Import React and related libraries
import React from 'react';

// Import components
import TabElement from './TabElement.jsx';

const data = [
  { name: 'adult', value: 'Adult' },
  { name: 'young adult', value: 'YA' },
  { name: 'children', value: 'Children' },
];

// Create the class
const AgeTabs = () => {
  // Render each TabElement
  const TabElements = data.map(element => (
    <TabElement
      key={element.name}
      id={element.name}
      name={element.name}
      value={element.value}
    />
  ));

  return (
    <div className="tab-container">
      <ul className="tab-container__ul">
        <li className="tab-container__outsider"></li>
          {TabElements}
        <li className="tab-container__outsider"></li>
      </ul>
    </div>
  );
};

export default AgeTabs;
