/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Application from '../../src/app/components/Application/Application';

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

    it('should have empty values for the state', () => {
      expect(component.state('filters')).to.eql([]);
      expect(component.state('selectableFilters')).to.eql([]);
      expect(component.state('picksData')).to.eql({});
      // Since the component did not mount yet:
      expect(component.state('isJsEnabled')).to.eql(false);
    });
  });
});
