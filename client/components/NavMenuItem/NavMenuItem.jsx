import React from 'react';

let NavMenuItem = React.createClass({
  getDefaultProps: function () {
    return {
      target: '#',
      root: '//nypl.org/',
      lang: 'en'
    };
  },
  // Pass the index of this item up to the parent so that it can set
  // the active item
  activate: function () {
    this.props.activate(this.props.index);
  },
  render: function () {
    let target = this.props.target,
      classes = '';

    if (target !== '#') {
      target = this.props.root + target;
    }

    if (this.props.isActive) {
      classes = 'active';
    }

    return (
      <li className={classes}>
        <a href={target} onMouseEnter={this.activate} >
          {this.props.label[this.props.lang]}
        </a>
      </li>
    );
  }
});

module.exports = NavMenuItem;