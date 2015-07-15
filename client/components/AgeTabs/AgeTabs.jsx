import React from 'react';
import Radium from 'radium';

import TabElement from 'components/AgeTabs/TabElement.jsx';
import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

class AgeTabs extends React.Component {
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

  render () {
    var _this = this;
    var TabElements = data.map ( function (element) {
      return (
        <TabElement clickFn={_this._handleClick(this, element.name)} key={element.name} id={element.name} className='tab-elements' name={element.name} />
      );
    });
  	return (
      <nav style={styles.Nav}>
        <ul className='tab-ul' style={styles.TabContainer}>
          {TabElements}
        </ul>
      </nav>
		);
  }

  _handleClick (age) {
    BookActions.updateFilterAge(age);
    // console.log(age);
  }
  
  _onChange () {
    // this.setState({
    //   age: BookStore.getAge()
    // });
  }
};

const styles = {
  Nav: {
    overflow: 'hidden'
  },
  TabContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#cc1a16',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
    display: 'block',
    fontSize: '16px',
    height: 'auto',
    margin: '40px auto',
    padding: '20px 0 21px 0',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  }
};

const data = [
  { name: 'adult', state: 'adult' },
  { name: 'young   adult', state: 'young  adult' },
  { name: 'child', state: 'child' }
];

export default Radium(AgeTabs);