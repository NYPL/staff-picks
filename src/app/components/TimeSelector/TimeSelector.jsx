import React from 'react';
import Router from 'react-router';

import { isEmpty as _isEmpty } from 'underscore';

import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';
import utils from '../../utils/utils.js';

let TimeSelector = React.createClass({

    routeHandler(url) {
      this.context.router.push(url);
    },

    getInitialState() {
      let params = this.props.params,
        transitionRoute = this.props.pickType === 'staffpicks' ?
          'month' : 'year',
        type;

      if (params && params.type &&
          (params.type === 'childrens' || params.type === 'ya')) {
        type = params.type;
      }

      return {
        transitionRoute,
        type
      };
    },

    _handleClick(selection, month) {
      let API;

      if (month) {
        API = '/browse/recommendations/staff-picks/api/ajax/picks/' + month.date;

        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: API,
          success: data => {
            let date = data.currentMonthPicks.date,
              picks = data.currentMonthPicks,
              filters = data.filters;

            utils._trackPicks('Select Month', `${selection}: ${month.month()}`);

            this.routeHandler(API);

            BookActions.clearFilters();
            BookActions.isotopesDidUpdate(true);
            BookActions.updatePicks(picks);
            BookActions.updateInitialFilters(filters);
            BookActions.isotopesDidUpdate(false);
          }
        });
      }
    },

    _getMonth(list) {
      let date = list ? list.date : {},
        month = {
          active: !_isEmpty(list),
          date: date,
          month: () => {
            if (_isEmpty(list)) {
              return;
            }
            return staffPicksDate(date).month;
          },
          year: () => {
            if (_isEmpty(list)) {
              return;
            }
            return staffPicksDate(date).year;
          }
        };

      return month;
    },

    _previousLink(list) {
      let previous = this._getMonth(list),
        dateDisplay = this.props.pickType === 'staffpicks' ?
          previous.month() : previous.year();

      return (previous.active) ?
        <a style={styles.previousDate}
          onClick={this._handleClick.bind(this, 'Previous', previous)}>
          <span className='left-icon'></span>Picks for {dateDisplay}
        </a>
        : null;
    },

    _nextLink(list) {
      let next = this._getMonth(list),
        dateDisplay = this.props.pickType === 'staffpicks' ?
          next.month() : next.year();

      return (next.active) ?
        <a style={styles.nextDate}
          onClick={this._handleClick.bind(this, 'Next', next)}>
          Picks for {dateDisplay}<span className='right-icon'></span>
        </a>
        : null;
    },

    render() {
      let currentMonthPicks = this.props.currentMonthPicks,
        pickDate = currentMonthPicks.date,
        date = staffPicksDate(pickDate),
        pickMonth = this.props.pickType === 'staffpicks' ?
          date.month : null,
        pickYear = date.year,
        previousBtn,
        nextBtn;

      previousBtn = this._previousLink(currentMonthPicks.previousList);
      nextBtn = this._nextLink(currentMonthPicks.nextList);

      return (
        <div className='TimeSelector' style={styles.timeSelector}>
          {previousBtn}
          <p style={styles.dateDisplay}>{pickMonth} {pickYear}</p>
          {nextBtn}
        </div>
      );
    }
  });

TimeSelector.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

const styles = {
  base: {},
  timeSelector: {
    height: '35px',
    marginLeft: '-23px',
    paddingTop: '7px',
    textAlign: 'center'
  },
  dateDisplay: {
    display: 'inline-block',
    color: '#333333',
    position: 'absolute',
    '@media (min-width: 600px)': { left: '52%' }
  },
  nextDate: {
    float: 'right'
  },
  previousDate: {
    float: 'left'
  }
};

export default TimeSelector;
