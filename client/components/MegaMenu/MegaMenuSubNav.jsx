import React from 'react';
import _ from 'underscore';

let MegaMenuSubNav = React.createClass({
  getDefaultProps: function () {
    return {
      lang: "en"
    };
  },
  render: function () {
    let items = _.map(this.props.items, function(m, i) {
        let target = m.target;

        if (typeof target === 'undefined') {
          // In reality target should never be undefined, but
          // this is plugging some holes in the fake data
          target = '#';
        } else if (!/^http/.exec(target)) {
          target = '//nypl.org/' + target;
        }
        return (
          <li key={i}>
            <a href={target}>{m.label[this.props.lang]}</a>
          </li>
        );
    }, this);

    return (
      <div className='sub-nav'>
        <h2>{this.props.label[this.props.lang]}</h2>
        <ul>{items}</ul>
      </div>
    );
  }
});

module.exports = MegaMenuSubNav;