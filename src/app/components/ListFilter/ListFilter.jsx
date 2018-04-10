import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../../appConfig';

class ListFilter extends React.Component {
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

  submitFormRequest() {
    // this function will be replaced by submiting to endpoint
    axios.get(`${config.baseApiUrl}${this.state.submitValue}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {

      });
  }

  handleChange(e) {
    this.setState(
      {
        submitValue: e.target.value,
      },
      () => {
        this.submitFormRequest();
      }
    );
  }

  renderFieldset() {
    const fieldsetProps = this.props.fieldsetProps;
    const visuallyHidden = (this.state.withJS) ? 'visuallyHidden' : '';
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
        <input type="submit" value={`Select ${selectName}`} className={visuallyHidden} />
      </fieldset>
    );
  }

  render() {
    return (
      <form>
        {this.renderFieldset()}
      </form>
    );
  }
}

ListFilter.propTypes = {
  fieldsetProps: PropTypes.object,
};

ListFilter.defaultProps = {
};

export default ListFilter;
