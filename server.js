import path from 'path';
import express from 'express';
import compress from 'compression';
import analytics from './analytics.js';
import colors from 'colors';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import appConfig from './appConfig.js';

import React from 'react';
import Router from 'react-router';
import DocMeta from 'react-doc-meta';

import parser from 'jsonapi-parserinator';
import _ from 'underscore';

import Footer from './src/app/components/Footer/Footer.jsx';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import routes from './src/app/routes/routes.jsx';
import ApiRoutes from './src/server/ApiRoutes/ApiRoutes.js';

// URL configuration
const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

let app = express(),
  isProduction = process.env.NODE_ENV === 'production';

// first assign the path
app.use('*/dist', express.static(DIST_PATH));

// Assign the path for static client files
app.use('*/client', express.static(path.resolve(ROOT_PATH, 'src/client')));

app.use(compress());
app.disable('x-powered-by');

app.set('view engine', 'ejs');
// app.set('view options', {layout: 'layout'});
app.set('views', path.resolve(__dirname, 'src/server/views'));
app.set('port', process.env.PORT || appConfig.port);

app.use('/', (req, res, next) => {
  if (req.path === '/recommendations/staff-picks') {
    return res.redirect('/recommendations/staff-picks/');
  }
  next();
});

app.use('/', ApiRoutes);

// after get the path
app.use(function(req, res) {
  let iso;

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  iso = new Iso();

  Router.run(routes.server, req.path, function (Root, state) {
    let html = React.renderToString(<Root />),
      footer = React.renderToString(<Footer />),
      metaTags = DocMeta.rewind(),
      renderedTags = metaTags.map((tag, index) =>
        React.renderToString(<meta data-doc-meta="true" key={index} {...tag} />));

    iso.add(html, alt.flush());

    res.render('index', {
      path: req.path,
      isProduction: isProduction,
      metatags: renderedTags,
      markup: iso.render(),
      footer: footer,
      gaCode: analytics.google.code(isProduction),
      appEnv: process.env.APP_ENV || 'no APP_ENV'
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


/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(appConfig.webpackDevServerPort, 'localhost', (err, result) => {
    if (err) {
      console.log(colors.red(err));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'), colors.cyan('localhost:' + appConfig.webpackDevServerPort));
  });
}
