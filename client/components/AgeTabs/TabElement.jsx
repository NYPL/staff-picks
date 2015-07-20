import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

// Component import
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

  _handleClick (age) {
    BookActions.updateFilterAge(age);
  }
  
  _onChange () {
    this.setState({
      age: BookStore.getAge()
    });
  }

  render () {
    let active = (this.state.age===this.props.value);
    const classes =  cx({ active: active, inactive: !active });
  	return (
  		<li key={`tab-${this.props.name}`} id={this.props.name} 
        className='tab-element' style={styles.TabElement}>
          <a 
            onClick={this._handleClick.bind(this, this.props.value)}
            className={classes}>
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

export default Radium(TabElement);