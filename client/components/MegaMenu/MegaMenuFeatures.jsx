import React from 'react';
import _ from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.jsx';

let MegaMenuFeatures = React.createClass({
  render: function () {
    var items = _.map(this.props.features, function(m, i) {
      return (
        <MegaMenuFeatureItem key={i} feature={m} />
      );
    }, this);

    return (
      <div className='features'>
        {items}
      </div>
    );
  }
});

module.exports = MegaMenuFeatures;