import React from 'react';
import PropTypes from 'prop-types';
import ListFilter from './ListFilter.jsx';
import config from '../../../../appConfig';

class ListSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState(
      {
        submitValue: e.target.value,
      },
      () => {
        // this function will be replaced by submiting to endpoint
        console.log(this.state.submitValue);
      }
    );
  }

  renderFieldset(fieldsetProps) {
    if (!fieldsetProps.options.length) {
      return null;
    }

    const selectName = fieldsetProps.fieldsetName;
    const selectId = `${selectName}-input`;
    const defaultValue = (fieldsetProps.options.length && fieldsetProps.options[0].value) ?
      fieldsetProps.options[0].value : '';
    const optionList = (fieldsetProps.options.length) ? fieldsetProps.options.map(
      (opt) => <option value={opt.value} key={opt.value}>{opt.name}</option>
    ) : null;

    return (
      <ListFilter fieldsetProps={fieldsetProps} handleChange={this.handleChange} />
    );
  }

  render() {
    const visuallyHidden = (this.props.isJsEnabled) ? 'visuallyHidden' : '';

    return (
      <form action={`${config.baseApiUrl}`} method="post">
        {this.renderFieldset(this.props.fieldsetProps.season)}
        {this.renderFieldset(this.props.fieldsetProps.audience)}
        <input type="submit" value={`Select List`} className={visuallyHidden} />
      </form>
    );
  }
}

ListSelector.propTypes = {
  fieldsetProps: PropTypes.object,
};

ListSelector.defaultProps = {
};

export default ListSelector;
