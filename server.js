import path from 'path';
import fs from 'fs';
import express from 'express';
import compress from 'compression';
import analytics from './analytics.js';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import appConfig from './appConfig.js';

import React from 'react';
import DocMeta from 'react-doc-meta';
import { match, RouterContext } from 'react-router';
import ReactDOMServer from 'react-dom/server';

import alt from 'dgx-alt-center';
import Iso from 'iso';

import appRoutes from './src/app/routes/routes.jsx';
import expressRoutes from './src/server/routes/routes.js';

// URL configuration
const ROOT_PATH = __dirname;
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
// Assign versioned build assets only on production environment
const buildAssets = (isProduction) ?
  JSON.parse(fs.readFileSync(path.join(DIST_PATH, 'assets.json'))) : '';

app.use(compress());
app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.set('views', path.resolve(ROOT_PATH, 'src/server/views'));
app.set('port', process.env.PORT || appConfig.port);

// first assign the path
app.use('*/dist', express.static(DIST_PATH));

// Assign the path for static client files
app.use('*/src/client', express.static(INDEX_PATH));


app.use('/', (req, res, next) => {
  if (req.path === '/books-music-dvds/recommendations/staff-picks') {
    return res.redirect('/books-music-dvds/recommendations/staff-picks/');
  }
  next();
});

app.use('/', expressRoutes);

// after get the path
app.use('/', (req, res) => {
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  const iso = new Iso();

  const routes = appRoutes.client;

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
      const metaTags = DocMeta.rewind();
      const safePath = req.path.replace(/'/g, '').replace(/"/g, '');
      const renderedTags = metaTags.map((tag, index) =>
        ReactDOMServer.renderToString(<meta data-doc-meta="true" key={index} {...tag} />)
      );

      iso.add(html, alt.flush());

      res
        .status(200)
        .render('index', {
          path: safePath,
          isProduction,
          metatags: renderedTags,
          markup: iso.render(),
          gaCode: analytics.google.code(isProduction),
          appEnv: process.env.APP_ENV || 'no APP_ENV',
          assets: buildAssets,
          webpackPort: WEBPACK_DEV_PORT,
        });
    } else {
      res.status(404).send('Not found');
    }
  });
});

const server = app.listen(app.get('port'), () => {
  console.log(`server running at localhost: ${app.get('port')}, go refresh and see magic`);
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully.');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit();
  });
  // if after
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 1000);
};
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
      'Access-Control-Allow-Headers': 'X-Requested-With',
    },
  }).listen(appConfig.webpackDevServerPort, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`Webpack Dev Server listening at localhost: ${appConfig.webpackDevServerPort}`);
  });
}
