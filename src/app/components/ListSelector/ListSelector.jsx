import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ListFilter from './ListFilter.jsx';
import config from '../../../../appConfig';

class ListSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  submitFormRequest() {
    // this function will be replaced by submiting to endpoint
    axios.get(`${config.baseApiUrl}${this.state.submitValue}`)
      .then(response => {
        // Catch the error from API
        if (response.data.statusCode >= 400) {
          console.log(`API error: ${response.data.errorMessage}`);
        }

        // For valid API response
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.statusText);
        console.log(error.response.status);
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

  renderFieldset(fieldsetProps) {
    if (!fieldsetProps.options.length) {
      return null;
    }

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
        <input type="submit" value="Select List" className={visuallyHidden} />
      </form>
    );
  }
}

ListSelector.propTypes = {
  fieldsetProps: PropTypes.object,
  isJsEnabled: PropTypes.bool,
};

ListSelector.defaultProps = {
};

export default ListSelector;
