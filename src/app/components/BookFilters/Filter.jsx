import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  CheckSoloIcon,
  DotsIcon,
} from 'dgx-svg-icons';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.filter.active,
      buttonActive: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If the new props are active and it's already NOT active,
    // then make it active but delay the SVG icon switch.
    if (nextProps.filter.active && !this.state.active) {
      this.setState({
        buttonActive: true,
        active: true,
      });

      setTimeout(() => {
        this.setState({ buttonActive: false });
      }, 500);
    }
  }

  onClick() {
    const filter = this.props.filter;
    this.props.onClick(filter.label, !filter.active);
    // Only set the state to false if it's already true.
    // Only needed for the internal state of the animation SVG.
    if (this.state.active) {
      this.setState({ active: false });
    }

    setTimeout(() => {
      ReactDOM.findDOMNode(this.refs[this.props.filter.label]).focus();
    }, 400);
  }

  render() {
    const { buttonActive } = this.state;
    const filter = this.props.filter;
    const activeClass = filter.active ? 'active' : '';
    const iconType = buttonActive ? <DotsIcon /> : <CheckSoloIcon />;

    return (
      <li className="filter-item">
        <button
          ref={filter.label}
          className={`nypl-primary-button ${activeClass}`}
          onClick={this.onClick}
        >
          {iconType}
          {filter.label}
        </button>
      </li>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.object,
  onClick: PropTypes.func,
};

export default Filter;
