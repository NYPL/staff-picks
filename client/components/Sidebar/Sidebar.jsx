import React from 'react';
import Radium from 'radium';

class BookDisplayButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='BookDisplayButtons'>
        <ul className='BookDisplayButtons-list'>
          <li><a href='#'>Cover</a></li>
          <li><a href='#'>List</a></li>
        </ul>
      </div>
    );
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
