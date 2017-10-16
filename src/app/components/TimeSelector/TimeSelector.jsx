/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty as _isEmpty } from 'underscore';

import BookActions from '../../actions/BookActions.js';
import staffPicksDate from '../../utils/DateService.js';
import utils from '../../utils/utils.js';
import config from '../../../../appConfig.js';

const { baseUrl } = config;
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
    const transitionRoute = this.props.annualList ? 'year' : 'month';
    let type;

    if (this.props.annualList && (params.type === 'childrens' || params.type === 'ya')) {
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
    let endpoint;

    if (month) {
      endpoint = `${baseUrl}api/ajax/picks/${month.date}`;

      axios
        .get(endpoint)
        .then(data => {
          const picks = data.data.currentMonthPicks;
          const filters = data.data.filters;

          utils.trackPicks('Select Month', `${selection}: ${month.month()}`);

          this.routeHandler(`${baseUrl}${month.date}`);

          BookActions.clearFilters();
          BookActions.isotopesDidUpdate(true);
          BookActions.updatePicks(picks);
          BookActions.updateInitialFilters(filters);
          BookActions.isotopesDidUpdate(false);
        })
        .catch(error => {
          console.log(`Error fetching ajax request: ${error}`);
        });
    }
  }

  routeHandler(url) {
    this.context.router.push(url);
  }

  previousLink(list) {
    const previous = this.getMonth(list);
    const dateDisplay = this.props.annualList ? previous.year() : previous.month();

    return (previous.active) ?
      <a
        href="#"
        style={styles.previousDate}
        onClick={() => this.handleClick('Previous', previous)}
      >
        <span className="left-icon"></span>Picks for {dateDisplay}
      </a>
      : null;
  }

  nextLink(list) {
    const next = this.getMonth(list);
    const dateDisplay = this.props.annualList ? next.year() : next.month();

    return (next.active) ?
      <a
        href="#"
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
    const pickMonth = this.props.annualList ? null : date.month;
    const pickYear = date.year;
    const previousBtn = this.previousLink(currentMonthPicks.previousList);
    const nextBtn = this.nextLink(currentMonthPicks.nextList);

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
  params: PropTypes.object,
  currentMonthPicks: PropTypes.object,
  annualList: PropTypes.bool,
};

TimeSelector.contextTypes = {
  router: PropTypes.object,
};

export default TimeSelector;
