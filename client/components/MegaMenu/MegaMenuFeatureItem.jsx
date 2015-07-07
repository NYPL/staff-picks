import React from 'react';

let MegaMenuFeatureItem = React.createClass({
    render: function () {
	let img = '';
	if (this.props.feature.image) {
	    img = <img src={this.props.feature.image} />
	}
	
	return (
	    <a href={this.props.feature.link} className='feature-item'>
	    <div className="image-column">
	    {img}
	    </div>
	    <div>
            <div className='feature-item-tag'>{this.props.feature.tag}</div>
            <h3>{this.props.feature.title}</h3>
            <div className='feature-item-desc'>{this.props.feature.desc}</div>
	    </div>
      </a>
    );
  }
});

module.exports = MegaMenuFeatureItem;