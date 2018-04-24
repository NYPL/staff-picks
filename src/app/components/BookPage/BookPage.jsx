import React from 'react';
import PropTypes from 'prop-types';
import { each as _each } from 'underscore';
import { Link } from 'react-router';
import { LeftWedgeIcon } from '@nypl/dgx-svg-icons';

import Book from '../Book/Book';
import BookStore from '../../stores/BookStore';
import appConfig from '../../../../appConfig';
import staffPicksDate from '../../utils/DateService';

class BookPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
  }

  render() {
    const paramId = this.props.params && this.props.params.id ? this.props.params.id : '';

    const { date, picks } = this.state.currentPicks;
    const displayDate = staffPicksDate(date);
    let pick;
    let age;

    _each(picks, (item) => {
      if (item.slug === paramId) {
        pick = item;
        age = appConfig.audienceMap[pick.ageGroup || 'Adult'];
      }
    });

    return (
      <div className="nypl-row book-page">
        <div className="sidebar nypl-column-one-quarter">
          <nav aria-label="Breadcrumbs">
            <Link to={`${appConfig.baseMonthUrl}${date}`} className="back-link">
              <LeftWedgeIcon ariaHidden />
              <span className="replaced-text visuallyHidden">Return to </span>
              Staff Picks
            </Link>
          </nav>
          <div className="book-filters">
            <div className="book-filters-heading" />
          </div>
        </div>

        <div className="booklist-section nypl-column-three-quarters">
          <h2>
            {displayDate.month} {displayDate.year} Picks for {age}
          </h2>
          <ul className="booklist">
            <Book pick={pick} isJsEnabled={this.props.isJsEnabled} />
          </ul>
        </div>
      </div>
    );
  }
}

BookPage.propTypes = {
  className: PropTypes.string,
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  isJsEnabled: PropTypes.bool,
};

BookPage.defaultProps = {
  className: 'BookPage',
  isJsEnabled: false,
};

BookPage.contextTypes = {
  router: PropTypes.object,
};

export default BookPage;
