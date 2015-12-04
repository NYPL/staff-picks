import React from 'react';
import Router from 'react-router';

import _ from 'underscore';

import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';
import utils from '../../utils/utils.js';

let Navigation = Router.Navigation,
  MonthPicker = React.createClass({
    getInitialState() {
      let params = this.props.params,
        transitionRoute = 'month',
        type;

      if (params && params.type && (params.type === 'childrens' || params.type === 'ya')) {
        transitionRoute = 'year';
        type = params.type;
      }

      return {
        transitionRoute,
        type
      };
    },

    mixins: [Navigation],

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

            this.transitionTo(this.state.transitionRoute, {
              month: date,
              type: this.state.type,
              year: date
            });

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
          active: !_.isEmpty(list),
          date: date,
          month: () => {
            if (_.isEmpty(list)) {
              return;
            }
            return staffPicksDate(date).month;
          }
        };

      return month;
    },

    _previousLink(list) {
      let previousMonth = this._getMonth(list);

      return (previousMonth.active) ?
        <a style={styles.previousMonth}
          onClick={this._handleClick.bind(this, 'Previous', previousMonth)}>
          <span className='left-icon'></span>Picks for {previousMonth.month()}
        </a>
        : null;
    },

    _nextLink(list) {
      let nextMonth = this._getMonth(list);

      return (nextMonth.active) ?
        <a style={styles.nextMonth}
          onClick={this._handleClick.bind(this, 'Next', nextMonth)}>
          Picks for {nextMonth.month()}<span className='right-icon'></span>
        </a>
        : null;
    },

    render() {
      let currentMonthPicks = this.props.currentMonthPicks,
        months = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'],
        pickDate = currentMonthPicks.date,
        date = staffPicksDate(pickDate),
        pickMonth = date.month,
        pickYear = date.year,
        previousBtn,
        nextBtn;

      previousBtn = this._previousLink(currentMonthPicks.previousList);
      nextBtn = this._nextLink(currentMonthPicks.nextList);

      return (
        <div className='month-picker' style={styles.monthPicker}>
          {previousBtn}
          <p style={styles.month}>{pickMonth} {pickYear}</p>
          {nextBtn}
        </div>
      );
    }
  });

const styles = {
  base: {},
  monthPicker: {
    height: '35px',
    marginLeft: '-23px',
    paddingTop: '7px',
    textAlign: 'center'
  },
  month: {
    display: 'inline-block',
    color: '#333333',
    position: 'absolute',
    '@media (min-width: 600px)': { left: '52%' }
  },
  nextMonth: {
    float: 'right'
  },
  previousMonth: {
    float: 'left'
  }
};

export default MonthPicker;
