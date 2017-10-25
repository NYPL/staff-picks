import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  CheckSoloIcon,
  DotsIcon,
} from 'dgx-svg-icons';

const ANIMATION_TIMEOUT = 400;

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // Since the list of filters get re-rendered, when the a new list is generated and it's
    // longer than the previous list, then we need to focus on the selected/deselected filter
    // once all the filters are mounted.
    setTimeout(() => {
      if (this.props.filter.id === this.props.focusId) {
        ReactDOM.findDOMNode(this.refs[this.props.filter.id]).focus();
      }
    }, ANIMATION_TIMEOUT);
  }

  componentWillReceiveProps(nextProps) {
    const {
      filter,
      focusId,
    } = nextProps;
    // If the focusId, the filter that was JUST selected/deselected, matches the filter,
    // then load the animation and remove it shortly after. Also focus on it whether it was
    // selected or deselected for accessibility.
    if (filter.id === focusId) {
      this.setState({
        loading: true,
      });

      setTimeout(() => {
        this.setState({ loading: false });
        ReactDOM.findDOMNode(this.refs[filter.id]).focus();
      }, ANIMATION_TIMEOUT);
    }
  }

  onClick() {
    const { filter } = this.props;
    this.props.onClick(filter.id, !filter.active);
  }

  render() {
    const { loading } = this.state;
    const { filter } = this.props;
    const activeClass = filter.active ? 'active' : '';
    const iconType = loading ? <DotsIcon /> : <CheckSoloIcon />;

    return (
      <li className="filter-item">
        <button
          ref={filter.id}
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
  focusId: PropTypes.string,
};

export default Filter;
