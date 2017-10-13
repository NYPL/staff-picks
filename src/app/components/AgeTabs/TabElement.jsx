// Import React and necessary libraries
import React from 'react';
import PropTypes from 'prop-types';

// Import components
import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import utils from '../../utils/utils.js';

// Styles
const styles = {
  TabElementActive: {
    borderBottomStyle: 'none',
    borderColor: '#cc1a16',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderWidth: '1px',
  },
  TabElementInactive: {
    borderBottomStyle: 'solid',
    borderColor: '#cc1a16',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
  },
};

// Create the class
class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    // Changed state when TabElement is clicked
    this.state = BookStore.getState();

    // Actions of mouse click event assigned to the class
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // Event listeners
  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(BookStore.getState());
  }

  // Actions of click event
  handleClick(age) {
    BookActions.updateFilterAge(age);
    BookActions.clearFilters();

    utils.trackPicks('Age Selected', age);
  }

  render() {
    // If state equals to the clicked value, then make the TabElement active
    const active = (this.state.age === this.props.value) ?
      styles.TabElementActive : styles.TabElementInactive;

    return (
      <li
        key={`tab-${this.props.name}`}
        id={this.props.name}
        className="tab-container__ul__element" style={active}
      >
        <a
          href="#"
          className="tab-container__ul__element__link"
          onClick={() => this.handleClick(this.props.value)}
        >
          {this.props.name}
        </a>
      </li>
    );
  }
}

TabElement.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
};

export default TabElement;
