// Import libraries
import React from 'react';
import Radium from 'radium';

import SocialMediaNode from './SocialMediaNode.jsx';

class SocialMediaList extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let SocialMediaNodes = this.props.data.map(function (node, i) {
      return (
        <SocialMediaNode name={node.name} link={node.link} className={node.className} key={i} />
      );
    });

    return (
      <ul className={this.props.className} style={this.props.style}>
      {SocialMediaNodes}
      </ul>
    );
  }
}

export default Radium(SocialMediaList);
