// require('newrelic');

/*** IMPORTANT ***/
// Babel/Register allows us to import ES6 and JSX React Components in Node.
// Without this step, the Component assignment would fail. 
//Similary, we use Webpack Babel to transpile our ES6 codebase into ES5.
require('babel/register');

require('./server.js');
