import React from 'react';
import Router from 'react-router';

import _ from 'underscore';

import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';
import utils from '../../utils/utils.js';

let Navigation = Router.Navigation,
  TimeSelector = React.createClass({
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
              type: this.state.type,
              month: date,
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
            return staffPicksDate(date, this.props.pickType).month;
          }
        };

      return month;
    },

    _previousLink(list) {
      let previous = this._getMonth(list);

      return (previous.active) ?
        <a style={styles.previousDate}
          onClick={this._handleClick.bind(this, 'Previous', previous)}>
          <span className='left-icon'></span>Picks for {previous.month()}
        </a>
        : null;
    },

    _nextLink(list) {
      let next = this._getMonth(list);

      return (next.active) ?
        <a style={styles.nextDate}
          onClick={this._handleClick.bind(this, 'Next', next)}>
          Picks for {next.month()}<span className='right-icon'></span>
        </a>
        : null;
    },

    render() {
      let currentMonthPicks = this.props.currentMonthPicks,
        pickDate = currentMonthPicks.date,
        date = staffPicksDate(pickDate, this.props.pickType),
        pickMonth = date.month,
        pickYear = date.year,
        previousBtn,
        nextBtn;

      previousBtn = this._previousLink(currentMonthPicks.previousList);
      nextBtn = this._nextLink(currentMonthPicks.nextList);

      return (
        <div className='month-picker' style={styles.timeSelector}>
          {previousBtn}
          <p style={styles.dateDisplay}>{pickMonth} {pickYear}</p>
          {nextBtn}
        </div>
      );
    }
  });

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
