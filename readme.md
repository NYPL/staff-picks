# Staff Picks

## Technology

* Universal React
* [Alt](http://alt.js.org/)/Iso as the Flux implementation
* Webpack & Webpack Dev Server
* ES6 and Babel
* ESLint with [Airbnb's config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
* Unit Testing with [Mocha](https://mochajs.org/) and [Enzyme](http://airbnb.io/enzyme/)
* Express Server

## Installation and running locally

### Installation

- Clone repository
- Perform:
    $ npm install

### Quick start

- Perform:
    $ npm start
- Navigate to http://localhost:3001/books-music-dvds/recommendations/staff-picks/

### Production mode

To run locally in production mode, run:

    $ NODE_ENV=production npm start

## To promote code

Feature branches are branched off from the `development` branch and then merged back into the `development` branch. Then it merges up to `master`.

```
master ---------------- ---------------- ---------------- ----------------master
development -------------------------------->development /^
   \ ----------> feature branch -/^
```

## Testing

### Unit Tests
Unit tests are currently written in the [Mocha](https://mochajs.org/) testing framework. [Chai](http://chaijs.com/) is used as the assertion library and [Enzyme](http://airbnb.io/enzyme/) is used as the React testing utility.

The tests can be found in the `test` folder.

To run all the tests once, run

    $ npm run test

To run the tests continuously for active development, run

    $ npm run test-dev

To run a specific test file, run

    $ npm run test-file test/unit/TabElement.test.js

### Code Coverage
[Istanbul](https://istanbul.js.org/) is used for checking code coverage.

To run the code coverage tool and view a quick report, run

    $ npm run coverage

To run the code coverage tool and view a better report, run

    $ npm run coverage-report

This last command will create a folder called `coverage` in the root directory. You can open up `coverage/lcov-report/index.html` in a browser to see more details about what lines of codes have not been tested.

## Bamboo
### To create a release to deploy

- Go to Bamboo http://bamboo.nypl.org/browse/NA-SWR
- Click on Deployments in the secondary navigation panel
- Click on chosen environment (development, qa, production)
- Click the ... on top right (under Search) and select 'Create release'
- Select 'Create new release from build result'
- Name release according to local naming conventions (e.g. master-v2.15)
- Create release

### To deploy to branch from release

- Go to Bamboo http://bamboo.nypl.org/browse/NA-SWR
- Click on Deployments in the secondary navigation panel
- Click on chosen environment (development, qa, production)
- Click Deploy on top right (under Search) and again select environment
- Select 'Promote existing release to this environment'
- Select release and start deployment
