'use strict';

let fs = require('fs'),
  path = require('path'),
  objectAssign = require('object-assign'),
  express = require('express'),
  favicon = require('express-favicon'),
  app = express(),
  compress = require('compression'),
  layouts = require('express-ejs-layouts'),
  analytics = require('./analytics.js'),
  http = require('http');


import React from 'react';
import Router from 'react-router';
import parser from 'jsonapi-parserinator';
import Header from './client/components/HeaderOld/Header.jsx';
import Hero from './client/components/Hero/Hero.jsx';
import Footer from './client/components/Footer/Footer.jsx';
import _ from 'underscore';
import DocMeta from 'react-doc-meta';

import axios from 'axios';
import alt from './client/alt.js';
import Iso from 'iso';

// first assign the path
app.use('*/client', express.static(path.join(process.cwd(), '/client')));

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));
app.set('port', process.env.PORT || 3001);

app.use(compress());
app.use(layouts);
app.disable('x-powered-by');


let API = require('./client/utils/ApiService'),
  env = {
    production: process.env.NODE_ENV === 'production'
  };

if (env.production) {
  objectAssign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}
// endpoint: '?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&page[limit]=1&include=previous-list,next-list,picks.item.tags,picks.age',
let options = {
    endpoint: '/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&page[limit]=1&include=previous-list,next-list,picks.item.tags,picks.age',
    // endpoint: '/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists/monthly-2015-06-01?include=previous-list,next-list,picks.item.tags,picks.age',
    includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
  },
  host = 'dev.refinery.aws.nypl.org',
  App = require('./client/server.jsx'),
  BookModal = require('./client/components/BookModal/BookModal.jsx'),
  Error404Page = require('./client/components/Error404Page/Error404Page.jsx'),
  Route = Router.Route,
  NotFoundRoute = Router.NotFoundRoute,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  routes,
  data;


/////////
parser.setChildrenObjects(options);

var endpoint = options.endpoint,
  opts = {
    host: host,
    path: endpoint,
    method: 'GET',
  },
  apiData;

var req = http.request(opts, function (res) {
  var responseString = '';
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    responseString += chunk;
  });

  res.on('end', function () {
    var result;

    try {
      result = JSON.parse(responseString);
    } catch (err) {
      console.log(err);
    }
    // cb(result);
    console.log('from http request');
    apiData = result;
  });
});

req.on('error', function (err) {
  console.log(err);
});

req.end();
/////////

// Will always get the latest pick
app.use('/', (req, res, next) => {
  let options = {
    endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&page[limit]=1&include=previous-list,next-list,picks.item.tags,picks.age',
    includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
  };

  parser.setChildrenObjects(options);

  axios
    .get(options.endpoint)
    .then(data => {
      let parsed = parser.parse(data.data);
      let filters = parser.getOfType(data.data.included, 'staff-pick-tag');

      // filters = _.chain(filters).pluck('id').flatten().value();
      // console.log(filters);
      res.locals.data = {
        "BookStore": {
          _picks: parsed[0],
          _bookDisplay:  'grid',
          _age: 'Adult',
          _gridDisplay: true,
          _listDisplay: false,
          _allFilters: [],
          _initialFilters: filters,
          _filters: [],
          _updatedFilters: []
        }
      }
      next()
    });
});

app.use('/api/picks', (req, res) => {
  let options = {
    endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-uri&page[limit]=1&include=previous-list,next-list,picks.item.tags,picks.age',
    includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
  };

  parser.setChildrenObjects(options);

  axios
    .get(options.endpoint)
    .then(data => {
      let parsed = parser.parse(data.data);
      res.json(parsed[0]);
    });
});


app.get('/api/picks/:month', (req, res, next) => {
  console.log(req.params.month);
  next();
});

// after get the path
app.use(function(req, res) {
  let monthPath = (req.path).substring(1,11),
    endpoint = '/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists?page[limit]=1&include=previous-list,next-list,picks.item.tags,picks.age';
  if (monthPath) {
    let endpoint = `/api/nypl/ndo/v0.1/staff-picks/staff-pick-lists/monthly-${monthPath}?include=previous-list,next-list,picks.item,picks.age`;
  }
  let path = req.path;

  if (req.path === '/recommendations/staff-picks') {
    return res.redirect('/recommendations/staff-picks/');
    path = '/';
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
  let iso = new Iso();

  Router.run(routes, path, function (Root, state) {
    let parsedData = [], filters = [], pickList = [], metaBook, data, currentData;

    data = apiData;
    parsedData = parser.parse(apiData);
    filters = parser.getOfType(data.included, 'staff-pick-tag');

    if (Array.isArray(parsedData)) {
      currentData = parsedData[0];
    } else {
      currentData = parsedData;
    }

    let previousList = currentData['previous-list'] ? currentData['previous-list'] : {};
    let nextList = currentData['next-list'] ? currentData['next-list'] : {};
    let currentList = {
      previousList,
      nextList,
      currentList: currentData['attributes']
    };


    let html = React.renderToString(
        <Root
          data={{'staff-picks': currentData['picks']}}
          filters={{'filters': filters}}
          currentList={currentList} />
      ),
      header = React.renderToString(<Header />),
      hero = React.renderToString(<Hero />),
      footer = React.renderToString(<Footer />),
      metaTags = DocMeta.rewind(),
      renderedTags = metaTags.map((tag, index) =>
        React.renderToString(<meta data-doc-meta="true" key={index} {...tag} />));

    iso.add(html, alt.flush());

    res.render('index', {
      path: req.path,
      staffPicks: JSON.stringify({'staff-picks': []}),
      filters: JSON.stringify({'filters': []}),
      pickList: [JSON.stringify({'staff-picks-list': []})],
      currentList: JSON.stringify(currentList),
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
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);

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
