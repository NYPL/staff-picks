import React from 'react';
import Radium from 'radium';

// Import Staff Pick components
import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
      age: BookStore.getAge()
    };
    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  _handleClick (value) {
    event.preventDefault();
 
    currentTab = value;

    BookActions.updateFilterAge(value);
    console.log('this is value: ' + value);
    console.log('this is tab: ' + currentTab);
  }
  
  _onChange () {
    this.setState({
      age: BookStore.getAge(),
      currentTab: this.props.value
    });
  }

  render () {
  	return (
  		<li key={`tab-${this.props.name}`} id={this.props.name} 
        className='tab-element' style={styles.TabElement}>
          <a 
            onClick={this._handleClick.bind(this, this.props.value)}
            className={(currentTab===this.props.value) ? 'active': null}>
            {this.props.name}
          </a>
  		</li>
		);
  }
};

const styles = {
  TabElement: {
    display: 'inline',
    margin: '0',
    textTransform: 'uppercase',
    whiteSpace: 'pre',
  }
}

const currentTab = 'adult';

export default Radium(TabElement);