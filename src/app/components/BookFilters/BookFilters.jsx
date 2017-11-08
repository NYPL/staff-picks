import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  FilterIcon,
  ResetIcon,
} from '@nypl/dgx-svg-icons';
import { contains as _contains } from 'underscore';

import Filter from './Filter';

class BookFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Create an array data structure of filter objects.
      filters: this.props.filters.map(filter => ({
        id: filter.toLowerCase().split(' ').join('-'),
        label: filter,
      })),
      selectedFilters: this.props.selectedFilters,
      focusId: '',
      disabled: false,
    };

    this.renderItems = this.renderItems.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getFilterArray = this.getFilterArray.bind(this);
    this.setDisabled = this.setDisabled.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedFilters: nextProps.selectedFilters });
  }

  onClick(filterId, active) {
    this.props.setSelectedFilter(filterId, active);
    ReactDOM.findDOMNode(this.refs.booksFound).focus();

    this.setState({
      filters: this.state.filters,
      focusId: filterId,
      disabled: active,
    });
  }

  /**
   * getFilterArray(selectableFilters, filters)
   * If the list of selectable filters is available, then we want the subset of all filters
   * that can be selected. A selectable filter is based on whether or not it is available
   * from a rendered pick item.
   * @param {array} selectableFilters
   * @param {array} filters
   */
  getFilterArray(selectableFilters, filters) {
    if (!selectableFilters.length) {
      return filters;
    }
    return filters.filter(filter => _contains(selectableFilters, filter.id));
  }

  setDisabled(disabled) {
    this.setState({ disabled });
  }

  /**
   * renderItems(filters)
   * Render the filter button list items.
   * @param {array} filter
   */
  renderItems(filters) {
    return filters.map((filter, i) => {
      const active = _contains(this.state.selectedFilters, filter.id);
      return (
        <Filter
          key={i}
          filter={filter}
          onClick={this.onClick}
          focusId={this.state.focusId}
          active={active}
          disabled={this.state.disabled}
          setDisabled={this.setDisabled}
        />
      );
    });
  }

  render() {
    const { filters } = this.state;
    const {
      selectableFilters,
      picksCount,
    } = this.props;

    if (!filters.length) {
      return null;
    }

    const filtersToRender = this.getFilterArray(selectableFilters, filters);
    const booksfound = `${picksCount} book${picksCount === 1 ? '' : 's'} found`;

    return (
      <div className="book-filters">
        <div className="book-filters-heading">
          <h2><FilterIcon /> Filter by Tags</h2>
          <span tabIndex="0" aria-live="assertive" aria-atomic="true" ref="booksFound">
            {booksfound}
          </span>
        </div>
        <span className="visuallyHidden">Click to apply or remove tags.</span>
        <ul>
          {this.renderItems(filtersToRender)}
        </ul>
        {
          !!this.state.selectedFilters.length &&
            (<button
              onClick={() => this.props.clearFilters(this.refs.booksFound)}
              className="nypl-primary-button clear-button"
              ref="clearFilters"
            >
              <ResetIcon />
              Clear All Filters
            </button>)
        }
      </div>
    );
  }
}

BookFilters.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
  selectedFilters: PropTypes.array,
  picksCount: PropTypes.number,
};

BookFilters.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectedFilter: () => {},
  clearFilters: () => {},
  selectedFilters: [],
};

export default BookFilters;
