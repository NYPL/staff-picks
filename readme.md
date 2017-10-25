# Staff Picks

[![GitHub version](https://badge.fury.io/gh/nypl%2Fstaff-picks.svg)](https://badge.fury.io/gh/nypl%2Fstaff-picks)
[![Build Status](https://travis-ci.org/NYPL/Staff-Picks.svg?branch=master)](https://travis-ci.org/NYPL/Staff-Picks)
[![dependencies Status](https://david-dm.org/nypl/staff-picks/status.svg)](https://david-dm.org/nypl/staff-picks)
[![devDependencies Status](https://david-dm.org/nypl/staff-picks/dev-status.svg)](https://david-dm.org/nypl/staff-picks?type=dev)

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

## AWS Elastic Beanstalk Workflow
### Configuration
All of the AWS Elastic Beanstalk configuration files exist in the `.ebextensions` directory. AWS will run all config files in numerical order based on the prefix `{NUM}_{FILENAME}.config` naming convention.

You must have AWS CLI installed on your machine with the proper AWS Profiles.

> Note: Please use the instance profile of `_cloudwatchable-beanstalk_`. It is configured with all of the permissions necessary for a traditional or Docker-flavored Beanstalk machine that enables logging to CloudWatch.

### Initialization

To initialize the application on AWS via the `aws-cli` run:

```bash
 eb init -i --profile ${your AWS profile}
```
### Creation

Initially we want to create the app on AWS Elastic Beanstalk by using this command:
```bash
eb create ${environment name} \
  --instance_type ${size of instance} (Ex: t2.small) \
  --instance_profile cloudwatchable-beanstalk \
  --scale ${amount of instances} (Ex: 1) \
  --cname ${cname prefix} (Ex: XXX.us-east-1.elasticbeanstalk.com) \
  --vpc.id ${ask for custom vpc_id} \
  --vpc.ec2subnets ${privateSubnetId1,privateSubnetId2} \
  --vpc.elbsubnets ${publicSubnetId1,publicSubnetId2} \
  --vpc.elbpublic (exposes the IP to the public) \
  --keyname ${ssh keyname} (allows the given ssh keyname to have ssh access) \
  --profile ${your AWS profile}
```
> Note: This step is only required upon creation and should executed once.

### Deployment
Once the application has been created via `eb create ...` all subsequent updates and deployments should use the following command:

```bash
eb deploy ${environment name} --profile ${your AWS profile}
```
