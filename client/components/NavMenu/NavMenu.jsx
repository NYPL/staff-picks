import React from 'react';
import _ from 'underscore';
import NavMenuItem from '../NavMenuItem/NavMenuItem.jsx';
import MegaMenu from '../MegaMenu/MegaMenu.jsx';

let NavMenu = React.createClass({
  getInitialState: function () {
    return {
      activeItem: null,
      lang: 'en'
    };
  },
  activate: function (i) {
    this.setState({
      activeItem: i
    });
  },
  deactivate: function () {
    this.activate(null);
  },
  render: function () {
    let items = _.map(this.props.items, function(m, i) {
      return (
        <NavMenuItem
          label={m.label}
          lang={this.props.lang}
          target={m.target}
          key={i}
          index={i}
          isActive={i === this.state.activeItem}
          activate={this.activate} />
      );
    }, this),
      megas = _.map(this.props.items, function(m, i) {
        return (
          <MegaMenu
            label={m.label}
            lang={this.props.lang}
            items={m.subnav}
            features={m.features}
            key={i}
            index={i}
            isActive={i === this.state.activeItem} />
        );
    }, this);
    return (
      <nav onMouseLeave={this.deactivate}>
        <ul id='nav_menu'>
          {items}
        </ul>
        {megas}
      </nav>
    );
  }
});

module.exports = NavMenu;
