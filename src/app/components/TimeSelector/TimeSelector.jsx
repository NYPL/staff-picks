/* global $ */

import React from 'react';

import { isEmpty as _isEmpty } from 'underscore';

import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';
import utils from '../../utils/utils.js';

const styles = {
  timeSelector: {
    height: '35px',
    marginLeft: '-23px',
    paddingTop: '7px',
    textAlign: 'center',
  },
  dateDisplay: {
    display: 'inline-block',
    color: '#333333',
    position: 'absolute',
  },
  nextDate: {
    float: 'right',
  },
  previousDate: {
    float: 'left',
  },
};

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);

    const params = this.props.params;
    const transitionRoute = this.props.pickType === 'staffpicks' ? 'month' : 'year';
    let type;

    if (params && params.type && (params.type === 'childrens' || params.type === 'ya')) {
      type = params.type;
    }

    this.state = {
      transitionRoute,
      type,
    };
  }

  getMonth(list) {
    const date = list ? list.date : {};
    return {
      active: !_isEmpty(list),
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
      },
      date,
    };
  }

  handleClick(selection, month) {
    let API;

    if (month) {
      API = `/browse/recommendations/staff-picks/api/ajax/picks/${month.date}`;

      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: API,
        success: data => {
          const picks = data.currentMonthPicks;
          const filters = data.filters;

          utils.trackPicks('Select Month', `${selection}: ${month.month()}`);

          this.routeHandler(`/browse/recommendations/staff-picks/${month.date}`);

          BookActions.clearFilters();
          BookActions.isotopesDidUpdate(true);
          BookActions.updatePicks(picks);
          BookActions.updateInitialFilters(filters);
          BookActions.isotopesDidUpdate(false);
        },
      });
    }
  }

  routeHandler(url) {
    this.context.router.push(url);
  }

  previousLink(list) {
    const previous = this.getMonth(list);
    const dateDisplay = this.props.pickType === 'staffpicks' ? previous.month() : previous.year();

    return (previous.active) ?
      <a
        style={styles.previousDate}
        onClick={() => this.handleClick('Previous', previous)}
      >
        <span className="left-icon"></span>Picks for {dateDisplay}
      </a>
      : null;
  }

  nextLink(list) {
    const next = this.getMonth(list);
    const dateDisplay = this.props.pickType === 'staffpicks' ? next.month() : next.year();

    return (next.active) ?
      <a
        style={styles.nextDate}
        onClick={() => this.handleClick('Next', next)}
      >
        Picks for {dateDisplay}<span className="right-icon"></span>
      </a>
      : null;
  }

  render() {
    const currentMonthPicks = this.props.currentMonthPicks;
    const pickDate = currentMonthPicks.date;
    const date = staffPicksDate(pickDate);
    const pickMonth = this.props.pickType === 'staffpicks' ? date.month : null;
    const pickYear = date.year;
    let previousBtn;
    let nextBtn;

    previousBtn = this.previousLink(currentMonthPicks.previousList);
    nextBtn = this.nextLink(currentMonthPicks.nextList);

    return (
      <div className="TimeSelector" style={styles.timeSelector}>
        {previousBtn}
        <p style={styles.dateDisplay}>{pickMonth} {pickYear}</p>
        {nextBtn}
      </div>
    );
  }
}

TimeSelector.propTypes = {
  params: React.PropTypes.object,
  pickType: React.PropTypes.string,
  currentMonthPicks: React.PropTypes.object,
};

TimeSelector.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  },
};

export default TimeSelector;
