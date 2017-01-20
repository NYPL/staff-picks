import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from '../app/components/Application/Application.jsx';
import BookModal from '../app/components/BookModal/BookModal.jsx';
import Error404Page from '../app/components/Error404Page/Error404Page.jsx';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import routes from '../app/routes/routes.jsx';
import { ga } from 'dgx-react-ga';

import FeatureFlags from 'dgx-feature-flags';

import './styles/main.scss';

window.onload = () => {
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);

    if (!window.ga) {
      console.log('Analytics not available - loading through React.');
      let gaOpts = { debug: false };
      ga.initialize('UA-1420324-3', gaOpts);
    }

    const appHistory = useRouterHistory(createBrowserHistory)();

    ReactDOM.render(
      <Router history={appHistory}>{routes.client}</Router>,
      container
    );
  });
};
