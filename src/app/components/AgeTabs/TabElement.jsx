// Import React and necessary libraries
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// Import components
import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

import utils from '../../utils/utils.js';

// Create the class
class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    // Changed state when TabElement is clicked
    this.state = BookStore.getState();

    // Actions of mouse click event assigned to the class
    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  // Event listeners
  componentDidMount() {
    BookStore.listen(this._onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this._onChange);
  }

  // Actions of click event
  _handleClick(age) {
    BookActions.updateFilterAge(age);
    BookActions.clearFilters();

    utils._trackPicks('Age Selected', age);
  }
  
  _onChange() {
    this.setState(BookStore.getState());
  }

  render() {
    // If state equals to the clicked value, then make the TabElement active
    let active = this.state._age === this.props.value;

  	return (
  		<li key={`tab-${this.props.name}`} id={this.props.name} 
        className='tab-container__ul__element'
        style={active ? styles.TabElementActive : styles.TabElementInactive}>
        <a className='tab-container__ul__element__link'
          onClick={this._handleClick.bind(this, this.props.value)}
          style={[active ? styles.TabElementLinkActive : null]}>
          {this.props.name}
        </a>
  		</li>
		);
  }
};

// Styles
const styles = {
  TabElementActive: {
    borderBottomStyle: 'none',
    borderColor: '#cc1a16',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderWidth: '1px'
  },
  TabElementInactive: {
    borderBottomStyle: 'solid',
    borderColor: '#cc1a16',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px'
  },
  TabElementLinkActive: {
    color: '#cc1a16'
  }
}

export default Radium(TabElement);
