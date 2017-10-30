import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  CheckSoloIcon,
  DotsIcon,
  XIcon,
} from 'dgx-svg-icons';
import { isEmpty as _isEmpty } from 'underscore';

const ANIMATION_TIMEOUT = 400;

class Filter extends React.Component {
  constructor(props) {
    super(props);

    const active = this.props.active;
    this.state = {
      icon: active ? <XIcon /> : <CheckSoloIcon />,
      activeClass: active ? 'active' : '',
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // Since the list of filters get re-rendered, when the a new list is generated and it's
    // longer than the previous list, then we need to focus on the selected/deselected filter
    // once all the filters are mounted.
    const {
      filter,
      focusId,
    } = this.props;

    if (filter && (filter.id === focusId)) {
      setTimeout(() => {
        ReactDOM.findDOMNode(this.refs[filter.id]).focus();
      }, ANIMATION_TIMEOUT);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      filter,
      focusId,
      active,
    } = nextProps;

    // If the focusId, the id of the filter that was JUST selected/deselected, matches the filter,
    // then load the animation SVG and remove it shortly after. Also focus on it whether it was
    // selected or deselected for accessibility. We then want to add the appropriate SVG based
    // on whether it is active or not.
    if (filter.id === focusId) {
      // Intermediate transition state:
      this.setState({
        icon: <DotsIcon />,
        activeClass: 'transition',
      });

      // Back to either active or inactive:
      setTimeout(() => {
        this.setState({
          icon: active ? <XIcon /> : <CheckSoloIcon />,
          activeClass: active ? 'active' : '',
        });

        ReactDOM.findDOMNode(this.refs[filter.id]).focus();
      }, ANIMATION_TIMEOUT);
    } else {
      // We want to set the icon back to its icon.
      this.setState({
        icon: active ? <XIcon /> : <CheckSoloIcon />,
        activeClass: active ? 'active' : '',
      });
    }
  }

  onClick() {
    const {
      filter,
      active,
    } = this.props;
    this.props.onClick(filter.id, !active);
  }

  render() {
    const {
      icon,
      activeClass,
    } = this.state;
    const { filter } = this.props;

    if (_isEmpty(filter)) {
      return null;
    }

    return (
      <li className="filter-item">
        <button
          ref={filter.id}
          className={`nypl-primary-button ${activeClass}`}
          onClick={this.onClick}
        >
          {icon} {filter.label}
        </button>
      </li>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.object,
  onClick: PropTypes.func,
  focusId: PropTypes.string,
  active: PropTypes.bool,
};

export default Filter;
