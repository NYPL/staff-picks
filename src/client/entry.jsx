// Polyfill Promise for legacy browsers
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import alt from '../app/alt';
import Iso from 'iso';

import routes from '../app/routes/routes.jsx';
import { config, gaUtils } from 'dgx-react-ga';

import FeatureFlags from 'dgx-feature-flags';

import RelatedBibs from '../app/components/RelatedBibs/RelatedBibs';

import './styles/main.scss';

window.onload = () => {
  if (!window.dgxFeatureFlags) {
    window.dgxFeatureFlags = FeatureFlags.utils;
  }

  Iso.bootstrap((state, container) => {
    alt.bootstrap(state);

    if (!window.ga) {
      const isProd = process.env.NODE_ENV === 'production';
      const gaOpts = { debug: !isProd, titleCase: false };

      gaUtils.initialize(config.google.code(isProd), gaOpts);
    }

    const appHistory = useRouterHistory(createBrowserHistory)();

    ReactDOM.render(
      <RelatedBibs />,
      container
    );

    gaUtils.trackPageview(window.location.pathname);
  });
};
