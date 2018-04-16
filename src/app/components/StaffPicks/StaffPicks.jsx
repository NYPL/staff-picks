import React from 'react';
import PropTypes from 'prop-types';

import BookStore from '../../stores/BookStore.js';

class StaffPicks extends React.Component {
  constructor(props) {
    super(props);

    this.state = BookStore.getState();
  }

  render() {
    return (
      <div>
      <p>This is a staff pick.</p>
      </div>
    );
  }
}

StaffPicks.propTypes = {
  className: PropTypes.string,
  params: PropTypes.object,
  data: PropTypes.array,
};

StaffPicks.defaultProps = {
  className: 'StaffPicks',
  id: 'StaffPicks',
};

StaffPicks.contextTypes = {
  router: PropTypes.object,
};

export default StaffPicks;
