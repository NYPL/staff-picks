import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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

  render() {
    const visuallyHidden = (this.state.withJS) ? 'visuallyHidden' : '';

    return (
      <form>
        <fieldset>
          <label htmlFor="seanson-input"></label>
          <select
            id="seasion-input"
            name="season"
            defaultValue="2018-01-01"
            onChange={this.handleChange}
          >
            <option value="2018-01-01">2018 Winter</option>
            <option value="2017-09-01">2017 Fall</option>
            <option value="2017-06-01">2017 Summer</option>
            <option value="2017-04-01">2017 Spring</option>
          </select>
          <input type="submit" value="Select Season" className={visuallyHidden} />
        </fieldset>
      </form>
    );
  }
}

ListFilter.propTypes = {
};

ListFilter.defaultProps = {
};

export default ListFilter;
