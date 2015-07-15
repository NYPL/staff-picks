import React from 'react';
import Radium from 'radium';

import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayType: BookStore.getBookDisplay()
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
    return (
      <div className='BookDisplayButtons'>
        <ul className='BookDisplayButtons-list'>
          <li >
            <a onClick={this._handleClick.bind(this, 'grid')}>
              <span className='BookDisplayButtons-grid-icon'></span>
              COVERS
            </a>
          </li>
          <li>
            <a onClick={this._handleClick.bind(this, 'list')}>
              <span className='BookDisplayButtons-list-icon'></span>
              LIST
            </a>
          </li>
        </ul>
      </div>
    );
  }

    /* Utility Methods should be declared below the render method */
  _handleClick (displayType) {
    BookActions.updateBookDisplay(displayType);
  }
  _onChange () {
    this.setState({
      displayType: BookStore.getBookDisplay()
    });
  }
}

class BookFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='BookFilters'>
        <span className='divider'></span> 
        <h2>What would you like to read?</h2>
        <div className='BookFilters-lists'>
          <span>Driven by...</span>
          <ul>
            <li><a href='#'>Character</a></li>
            <li><a href='#'>Setting</a></li>
          </ul>
          <span>Themes...</span>
          <ul>
            <li><a href='#'>Arty</a></li>
            <li><a href='#'>Creepy</a></li>
            <li><a href='#'>Dangerous</a></li>
            <li><a href='#'>Techie</a></li>
            <li><a href='#'>Nail-biters</a></li>
          </ul>
          <div className='clearFilters'>
            Clear Filters X
          </div>
        </div>
      </div>
    );
  }
}

class Sidebar extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div ref='sidebar' className='sidebar-content'>
        <BookDisplayButtons />
        <BookFilters />
      </div>
    );
  }
};

Sidebar.defaultProps = {
};

const styles = {
  base: {

  }
};

export default Radium(Sidebar);
