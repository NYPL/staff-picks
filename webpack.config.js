process.traceDeprecation = true;
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanBuild = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SaveAssetsJson = require('assets-webpack-plugin');
const sassPaths = require('@nypl/design-toolkit').includePaths
.map((sassPath) => sassPath).join('&');

const assetsPluginInstance = new SaveAssetsJson({
  filename: 'dist/assets.json',
});

// References the applications root path
const ROOT_PATH = path.resolve(__dirname);

// Sets the variable as either development or production
const ENV = process.env.NODE_ENV || 'development';

// Holds the common settings for any environment
const commonSettings = {
  // path.resolve - resolves to an absolute path
  // This is the path and file of our top level
  // React App that is to be rendered.
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(ROOT_PATH, 'src/client/entry.jsx'),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    // Sets the output path to ROOT_PATH/dist
    path: path.resolve(ROOT_PATH, 'dist'),
    libraryTarget: 'umd',
    library: 'dgxStaffPicks',
  },
  plugins: [
    // Cleans the Dist folder after every build.
    // Alternately, we can run rm -rf dist/ as
    // part of the package.json scripts.
    new cleanBuild(['dist']),
    new ExtractTextPlugin('styles.css'),
  ],
};

/**
 * DEVELOPMENT ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional development specific settings.
 *
 **/
// Need to configure webpack-dev-server and hot-reload
// module correctly.
if (ENV === 'development') {
  module.exports = merge(commonSettings, {
    devtool: 'eval',
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
      ],
    },
    output: {
      publicPath: 'http://localhost:3000/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      modules: [
        'node_modules',
      ],
      extensions: ['.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.scss?$/,
          use: [
            'style-loader',
            'css-loader',
            `sass-loader?includePaths=${sassPaths}`,
          ],
          include: path.resolve(ROOT_PATH, 'src/client'),
        },
      ],
    },
  });
}

/**
 * PRODUCTION ENVIRONMENT CONFIG
 * ------------------------------
 * Uses the webpack-merge plugin to merge
 * the common app configuration with the
 * additional production specific settings.
 *
 **/
if (ENV === 'production') {
  const loaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: sassPaths,
      },
    },
  ];
  module.exports = merge(commonSettings, {
    devtool: 'source-map',
    output: {
      filename: 'bundle.[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          include: path.resolve(ROOT_PATH, 'src/client'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: loaders,
          }),
        },
      ],
    },
    plugins: [
      assetsPluginInstance,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  });
}
