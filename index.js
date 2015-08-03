'use strict';

var fs = require('fs');
var path = require('path');

var objectAssign = require('object-assign');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

var React = require('react');
var sassMiddleware = require('node-sass-middleware');

app.use('/styles', sassMiddleware({
  src: __dirname + '/client/styles',
  dest: path.join(__dirname, 'styles'),
  debug: false,
  outputStyle: 'compressed'
}));

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');

// Assign the desired React Component to be rendered as a string
// This step is necessary in order to render server-side (Isomorphic)
// var App = React.createFactory(
//   require(path.join(process.cwd(), '/client/server.jsx'))
// );

var API = require('./client/utils/ApiService');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  objectAssign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

var parser = require('jsonapi-parserinator');
var options = {
    endpoint: '/api/nypl/ndo/v0.1/staff-picks',
    includes: ['item.tags', 'list', 'age']
  },
  host = 'dev.refinery.aws.nypl.org',
  data;

var Router = require('react-router');
var App = require('./client/server.jsx');
var BookModal = require('./client/components/BookModal/BookModal.jsx');
var Error404Page = require('./client/components/Error404Page/Error404Page.jsx');

var AppTest = React.createFactory(
  require(path.join(process.cwd(), './client/server.jsx'))
);

// var BookModal = React.createFactory(
//   require(path.join(process.cwd(), './client/components/BookModal/BookModal.jsx'))
// );

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;
var routes = (
    <Route path='/' handler={App} ignoreScrollBehavior>
    </Route>
  );

import Header from './client/components/HeaderOld/Header.jsx';
import Hero from './client/components/Hero/Hero.jsx';
import Footer from './client/components/Footer/Footer.jsx';


app.use('/', function(req, res) {
  parser
    .setHost({
      api_root: host,
      api_version: 'v0.1'
    })
    .get(options, function (apiData) {
      var parsedData, filters, pickList;

      data = apiData;

      if (apiData) {
        parsedData = parser.parse(data);
        filters = parser.getOfType(apiData.included, 'staff-pick-tag');
        pickList = parser.getOfType(apiData.included, 'staff-pick-list');


        API.setStaffPick({'staff-picks': parsedData});
        API.setFilters({'filters': filters});
        API.setPickList({'staff-picks-list': pickList});
      }

      // res.render('index', {
      //   staffPicks: JSON.stringify({'staff-picks': parsedData}),
      //   filters: JSON.stringify({'filters': filters}),
      //   pickList: JSON.stringify({'staff-picks-list': pickList}),
      //   env: env
      // });

      Router.run(routes, req.path, function (Root, state) {
        // could fetch data like in the previous example
        var html = React.renderToString(<Root data={{'staff-picks': parsedData}}/>);
        var header = React.renderToString(<Header />);
        var hero = React.renderToString(<Hero />);
        var footer = React.renderToString(<Footer />);
        
        res.render('index', {
          staffPicks: JSON.stringify({'staff-picks': parsedData}),
          filters: JSON.stringify({'filters': filters}),
          pickList: JSON.stringify({'staff-picks-list': pickList}),
          env: env,
          header: header,
          hero: hero,
          markup: html,
          footer: footer
        });
      });
    });


  // Router.run(routes, Router.HistoryLocation, (Root) => {
  //   React.render(<Root />, document.getElementById('content'));
  // });

});

var port = Number(process.env.PORT || 3001);
var server = app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
var gracefulShutdown = function() {
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
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig = require('./webpack.dev.config');

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
