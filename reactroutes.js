'use strict';

import fs from 'fs';
import path from 'path';
import objectAssign from 'object-assign';
import express from 'express';
import favicon from 'express-favicon';
import compress from 'compression';
import analytics from './analytics.js';

import React from 'react';
import Router from 'react-router';
import DocMeta from 'react-doc-meta';

import parser from 'jsonapi-parserinator';
import _ from 'underscore';

import Header from './client/components/HeaderOld/Header.jsx';
import Hero from './client/components/Hero/Hero.jsx';
import Footer from './client/components/Footer/Footer.jsx';
import App from './client/server.jsx';
import BookModal from './client/components/BookModal/BookModal.jsx';
import Error404Page from './client/components/Error404Page/Error404Page.jsx';

import axios from 'axios';
import alt from './client/alt.js';
import Iso from 'iso';

let app = express();

// first assign the path
app.use('*/client', express.static(path.join(process.cwd(), '/client')));

app.use(compress());
app.disable('x-powered-by');

app.set('view engine', 'ejs');
// app.set('view options', {layout: 'layout'});
app.set('views', path.resolve(__dirname, 'server/views'));
app.set('port', process.env.PORT || 3001);


let env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  objectAssign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

// server and client side API routes
let ApiRoutes = require('./server/ApiRoutes/ApiRoutes.js');

app.use('/', ApiRoutes);

// after get the path
app.use(function(req, res) {
  let Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    routes,
    iso;

  if (req.path === '/recommendations/staff-picks') {
    return res.redirect('/recommendations/staff-picks/');
  }

  routes = (
    <Route name='home' path='/' handler={App} ignoreScrollBehavior>
      <Route name='month' path='/:month?/?' ignoreScrollBehavior/>
      <Route name='modal' path='/:month/:id?/?' handler={BookModal} ignoreScrollBehavior>
        <NotFoundRoute handler={Error404Page} />
      </Route>
    </Route>
  );

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  iso = new Iso();

  Router.run(routes, req.path, function (Root, state) {
    let html = React.renderToString(<Root />),
      header = React.renderToString(<Header />),
      hero = React.renderToString(<Hero />),
      footer = React.renderToString(<Footer />),
      metaTags = DocMeta.rewind(),
      renderedTags = metaTags.map((tag, index) =>
        React.renderToString(<meta data-doc-meta="true" key={index} {...tag} />));

    iso.add(html, alt.flush());

    res.render('index', {
      path: req.path,
      env: env,
      metatags: renderedTags,
      header: header,
      hero: hero,
      markup: iso.render(),
      footer: footer,
      gaCode: analytics.google.code(env.production)
    });
  }); /* end Router.run */
});

let server = app.listen(app.get('port'), function () {
  console.log('server running at localhost:' + app.get('port') + ', go refresh and see magic');
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
let gracefulShutdown = function() {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(function() {
    console.log("Closed out remaining connections.");
    process.exit()
  }); 
  // if after 
  setTimeout(function() {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit()
  }, 10*1000);
}
// listen for TERM signal .e.g. kill 
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);


// Webpack Dev Server
if (env.production === false) {
  let webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.dev.config');

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('webpack dev server listening on localhost:3000');
  });
}

