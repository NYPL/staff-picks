import React from 'react';
import PropTypes from 'prop-types';

// NYPL Components
import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import { extend as _extend } from 'underscore';

import Hero from '../Hero/Hero.jsx';
import BookActions from '../../actions/BookActions';
import BookStore from '../../stores/BookStore';
import config from '../../../../appConfig.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    const annualList = !!(this.props.params && this.props.params.type &&
      (this.props.params.type === 'childrens' || this.props.params.type === 'ya'));
    this.state = _extend({ annualList }, this.props, BookStore.getState());
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
    BookActions.setIsJsEnabled(true);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(_extend({}, this.props, BookStore.getState()));
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header
          navData={navConfig.current}
          skipNav={{ target: 'app-content' }}
        />

        <main className="main-page">
          <Hero
            currentPicks={this.state.currentPicks}
            heroData={config.heroData.annual[this.props.params.type]}
          />

          <div id="app-content" className="nypl-full-width-wrapper">
            {React.cloneElement(this.props.children, this.state)}
          </div>
        </main>

        <Footer id="footer" className="footer" />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  filters: PropTypes.array,
  params: PropTypes.object,
  location: PropTypes.object,
};

App.contextTypes = {
  router: PropTypes.object,
};

export default App;
