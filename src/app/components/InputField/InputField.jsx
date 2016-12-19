import React from 'react';

const InputField = (props) => (
  <input
    id={props.id}
    lang={props.lang}
    type={props.type}
    name={props.name}
    value={props.value}
    checked={props.checked}
    maxLength={props.maxLength}
    placeholder={props.placeholder}
    className={props.className}
    onClick={props.onClick}
    onChange={props.onChange}
    required={props.isRequired || false}
    style={props.style}
  />
);

InputField.propTypes = {
  id: React.PropTypes.string,
  lang: React.PropTypes.string,
  type: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  maxLength: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onChange: React.PropTypes.func,
  isRequired: React.PropTypes.bool,
  style: React.PropTypes.object,
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField',
};

export default InputField;
