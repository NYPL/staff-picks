/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Application from '../../src/app/components/Application/Application.jsx';

const params = {
  ya: {
    type: 'ya',
  },
  childrens: {
    type: 'childrens',
  },
};

describe('Application', () => {
  describe('YA param', () => {
    let component;

    before(() => {
      // Not the best way to initialize this component:
      component = shallow(<Application params={params.ya} children={[]} />);
    });

    it('should be wrapped in an .app-wrapper class', () => {
      expect(component.find('.app-wrapper').length).to.equal(1);
    });

    it('should render a <Header> component', () => {
      expect(component.find('Header').length).to.equal(1);
    });

    it('should render a <Footer> component', () => {
      expect(component.find('Footer').length).to.equal(1);
    });

    it('should render a <Hero> component', () => {
      expect(component.find('Hero').length).to.equal(1);
    });

    it('should render a div with id `app-content` for the skip navigation', () => {
      expect(component.find('#app-content').length).to.equal(1);
    });

    it('should have the `annualList` state variable set to true since `ya` is in the param', () => {
      expect(component.state('annualList')).to.equal(true);
    });

    it('should have empty values for the state', () => {
      expect(component.state('filters')).to.eql([]);
      expect(component.state('selectableFilters')).to.eql([]);
      expect(component.state('currentPicks')).to.eql({});
      // Since the component did not mount yet:
      expect(component.state('isJsEnabled')).to.eql(false);
    });
  });

  describe('Childrens param', () => {
    it('should have the `annualList` state variable set to true', () => {
      const component = shallow(<Application params={params.childrens} children={[]} />);
      expect(component.state('annualList')).to.equal(true);
    });
  });

  describe('No specific param', () => {
    it('should have the `annualList` state variable set to false', () => {
      const component = shallow(<Application params={{}} children={[]} />);
      expect(component.state('annualList')).to.equal(false);
    });
  });
});
