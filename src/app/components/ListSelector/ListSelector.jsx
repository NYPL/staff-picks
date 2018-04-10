import React from 'react';
import PropTypes from 'prop-types';

class ListSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      withJS: false,
      submitValue: '2018-01-01',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      withJS: true,
    });
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

  renderFieldset() {
    const fieldsetProps = this.props.fieldsetProps;
    const selectName = fieldsetProps.fieldsetName;
    const selectId = `${selectName}-input`;
    const defaultValue = (fieldsetProps.options.length && fieldsetProps.options[0].value) ?
      fieldsetProps.options[0].value : '';
    const optionList = (fieldsetProps.options.length) ? fieldsetProps.options.map(
      (opt) => <option value={opt.value} key={opt.value}>{opt.name}</option>
    ) : null;

    return (
      <fieldset>
        <label htmlFor={selectId}></label>
        <select
          id={selectId}
          name={selectName}
          defaultValue={defaultValue}
          onChange={this.handleChange}
        >
         {optionList}
        </select>
      </fieldset>
    );
  }

  render() {
    const visuallyHidden = (this.props.isJsEnabled) ? 'visuallyHidden' : '';

    return (
      <form>
        {this.renderFieldset()}
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
