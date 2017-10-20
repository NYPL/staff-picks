import React from 'react';
import PropTypes from 'prop-types';

// NYPL Components
import { Header, navConfig } from '@nypl/dgx-header-component';
import Footer from '@nypl/dgx-react-footer';
import { extend as _extend } from 'underscore';

import Hero from '../Hero/Hero.jsx';
import BookStore from '../../stores/BookStore.js';

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
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(_extend({}, this.props, BookStore.getState()));
  }

  render() {
    return (
      <div className="home">
        <Header
          navData={navConfig.current}
          skipNav={{ target: 'app-content' }}
        />
        <Hero
          params={this.props.params}
          location={this.props.location}
          annualList={this.state.annualList}
        />

        <div id="app-content">
          {React.cloneElement(this.props.children, this.state)}
        </div>
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
