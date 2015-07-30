'use strict';

var fs = require('fs');
var path = require('path');

var objectAssign = require('object-assign');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));

app.disable('x-powered-by');

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

// app.get('/parser', function () {

//   parser
//     .setHost({
//       api_root: 'dev.refinery.aws.nypl.org',
//       api_version: 'v0.1'
//     })
//     .get(options, function (apiData) {
//       data = apiData;
//       var parsedData = parser.parse(data);
//       console.log(parsedData);
//     });

// });

app.get('/*', function(req, res) {
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
      }

      res.render('index', {
        staffPicks: JSON.stringify({'staff-picks': parsedData}),
        filters: JSON.stringify({'filters': filters}),
        pickList: JSON.stringify({'staff-picks-list': pickList}),
        env: env
      });
    });
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

process.on ('SIGKILL', gracefulShutdown);

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
