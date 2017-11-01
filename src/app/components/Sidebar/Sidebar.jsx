import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group'
import { LeftWedgeIcon } from 'dgx-svg-icons';

import BookFilters from '../BookFilters/BookFilters.jsx';
import config from '../../../../appConfig';

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// };
//
// const transitionStyles = {
//   entering: { opacity: 0 },
//   entered: { opacity: 1 },
// };


const Sidebar = (props) => {
  const Fade = ({ inProp, duration = 300 }) => {
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    };

    return (
      <Transition in={inProp} timeout={duration}>
        {(state) => (
          <div style={Object.assign({}, defaultStyle, transitionStyles)}>
            <BookFilters
              filters={props.filters}
              selectableFilters={props.selectableFilters}
              setSelectedFilter={props.setSelectedFilter}
              clearFilters={props.clearFilters}
              selectedFilters={props.selectedFilters}
            />
          </div>
        )}
      </Transition>
    );
  };

  return (
    <div className="sidebar nypl-column-one-quarter">
      <a href={config.recommendationsLink.url} className="back-link">
        <LeftWedgeIcon /> {config.recommendationsLink.label}
      </a>
      <Fade in={props.isJsEnabled} />
    </div>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.array,
  selectableFilters: PropTypes.array,
  setSelectedFilter: PropTypes.func,
  clearFilters: PropTypes.func,
  isJsEnabled: PropTypes.bool,
  selectedFilters: PropTypes.array,
};

Sidebar.defaultProps = {
  filters: [],
  selectableFilters: [],
  setSelectableFilters: () => {},
  clearFilters: () => {},
};

export default Sidebar;
