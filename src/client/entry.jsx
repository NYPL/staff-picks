import React from 'react/addons';
import Router from 'react-router';

import App from '../app/components/Application/Application.jsx';
import BookModal from '../app/components/BookModal/BookModal.jsx';
import Error404Page from '../app/components/Error404Page/Error404Page.jsx';
import Footer from '../app/components/Footer/Footer.jsx';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import routes from '../app/routes/routes.jsx';
import ga from 'react-ga';

import './styles/main.scss';

window.onload = () => {
  Iso.bootstrap((state, meta, container) => {
    alt.bootstrap(state);

    if (!window.ga) {
      console.log('Analytics not available - loading through React.');
      let gaOpts = { debug: false };
      ga.initialize('UA-1420324-3', gaOpts);
    }

    Router.run(routes.server, Router.HistoryLocation, (Root, state) => {
      // console.log(state.pathname);
      // let lastCharIndex = state.pathname.length - 1,
      //   pageview = state.pathname;

      // if (state.pathname[lastCharIndex] === '/') {
      //   pageview = state.pathname.substring(0, lastCharIndex);
      // }

      // ga.pageview(pageview);
      React.render(<Root params={state.params}/>, container);
    });

    React.render(<Footer />, document.getElementById('footer-container'));
  });
};
