import React from 'react/addons';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import App from '../app/components/Application/Application.jsx';
import BookModal from '../app/components/BookModal/BookModal.jsx';
import Error404Page from '../app/components/Error404Page/Error404Page.jsx';
import Footer from '../app/components/Footer/Footer.jsx';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import routes from '../app/routes/routes.jsx';
import ga from 'react-ga';

import FeatureFlags from 'dgx-feature-flags';

import './styles/main.scss';

window.onload = () => {
  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);

    if (!window.ga) {
      console.log('Analytics not available - loading through React.');
      let gaOpts = { debug: false };
      ga.initialize('UA-1420324-3', gaOpts);
    }

    if (!window.dgxFeatureFlags) {
      window.dgxFeatureFlags = FeatureFlags.utils;
    }

    const appHistory = useScroll(useRouterHistory(createBrowserHistory))();

    ReactDOM.render(
      <Router history={appHistory}>{routes.client}</Router>,
      container
    );
  });
};
