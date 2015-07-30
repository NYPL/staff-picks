// Import React and necessary libraries
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// Import components
import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';


// Create the class
class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    // Changed state when TabElement is clicked
    this.state = { 
      age: BookStore.getAge()
    };
    // Actions of mouse click event assigned to the class
    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  // Event listeners
  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  // Actions of click event
  _handleClick (age) {
    BookActions.updateFilterAge(age);
    BookActions.clearFilters();
  }
  
  _onChange () {
    this.setState({
      age: BookStore.getAge()
    });
  }

  render () {
    // If state equals to the clicked value, then make the TabElement active
    let active = this.state.age === this.props.value;
  	return (
  		<li key={`tab-${this.props.name}`} id={this.props.name} 
        className='tab-element' style={[styles.TabElement, 
        active ? styles.TabElementActive : styles.TabElementInactive]}>
          <a
            onClick={this._handleClick.bind(this, this.props.value)}
            style={[styles.TabElementLink, active ? styles.TabElementLinkActive : null]}>
            {this.props.name}
          </a>
  		</li>
		);
  }ß
};

// Styles
const styles = {
  TabElement: {
    '@media (max-width: 767px)': { width: '33%' },
    display: 'inline-block',
    margin: '0',
    padding: '20px 0 20px 0',
    textTransform: 'uppercase',
    whiteSpace: 'pre',
    width: '23%'
  },
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
  TabElementLink: {
    color: '#bfbfbf',
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: '#cc1a16'
    }
  },
  TabElementLinkActive: {
    color: '#cc1a16'
  }
}

export default Radium(TabElement);
