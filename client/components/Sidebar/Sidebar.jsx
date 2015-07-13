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
        <hr />
        <p>What would you like to read today?</p>
        <div>
          <ul>Driven by...
            <li>Character</li>
            <li>Setting</li>
          </ul>
          <ul>Themes...
            <li>Arty</li>
            <li>Creepy</li>
            <li>Dangerous</li>
            <li>Techie</li>
            <li>Nail-biters</li>
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
