// Import libraries
import React from 'react';
import Radium from 'radium';

class SocialMediaNode extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <li key='SocialMediaNode' id={this.props.name}>
      <a key='SocialMediaLink' className={this.props.className} style={styles.SocialMediaLink} href={this.props.link}>
      <span className='replaced-text' style={styles.ReplacedText} >
      {this.props.name}
      </span>
      </a>
      </li>
    );
  }
}

const styles = {};

export default Radium(SocialMediaNode);
