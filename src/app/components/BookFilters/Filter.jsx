import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckSoloIcon,
  DotsIcon,
} from 'dgx-svg-icons';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      buttonActive: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const filterId = this.props.filter.toLowerCase().split(' ').join('-');
    this.props.onClick(filterId, !this.state.selected);
    this.setState({
      selected: !this.state.selected,
      buttonActive: true,
    });

    setTimeout(() => {
      this.setState({ buttonActive: false });
    }, 1000);
  }

  render() {
    const {
      selected,
      buttonActive,
    } = this.state;
    const filter = this.props.filter;
    const activeClass = selected ? 'active' : '';
    const iconType = buttonActive ? <DotsIcon /> : <CheckSoloIcon />;

    return (
      <li className="filter-item">
        <button
          className={`nypl-primary-button ${activeClass}`}
          onClick={this.onClick}
        >
          {iconType}
          {filter}
        </button>
      </li>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
  onClick: PropTypes.func,
};

export default Filter;
