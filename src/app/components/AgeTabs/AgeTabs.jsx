// Import React and related libraries
import React from 'react';
import PropTypes from 'prop-types';

// Import components
import TabElement from './TabElement.jsx';

const data = [
  { name: 'adult', value: 'Adult' },
  { name: 'young adult', value: 'YA' },
  { name: 'children', value: 'Children' },
];

// Create the class
class AgeTabs extends React.Component {
  render() {
    // Render each TabElement
    const TabElements = data.map(element => (
      <TabElement
        key={element.name}
        id={element.name}
        name={element.name}
        value={element.value}
      />
    ));

    if (this.props.params && !this.props.params.type) {
      return (
        <div className="tab-container">
          <ul className="tab-container__ul">
            <li key="li-before" className="tab-container__outsider"></li>
              {TabElements}
            <li key="li-after" className="tab-container__outsider"></li>
          </ul>
        </div>
      );
    }

    return null;
  }
}

AgeTabs.propTypes = {
  params: PropTypes.object,
};

export default AgeTabs;
