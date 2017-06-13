import React from 'react';
import PropTypes from 'prop-types';

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
  id: PropTypes.string,
  lang: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  style: PropTypes.object,
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField',
};

export default InputField;
