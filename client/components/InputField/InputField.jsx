import React from 'react';
import Radium from 'radium';

class InputField extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <input
      lang={this.props.lang}
      type={this.props.type} 
      name={this.props.name} 
      value={this.props.value}
      placeholder={this.props.placeholder}
      required={this.props.required || null}
      style={[
        styles.base,
        this.props.style
      ]} />
    );
  }
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField'
};

const styles = {
  base: {

  }
};

export default Radium(InputField);