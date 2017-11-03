/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Filter from '../../src/app/components/BookFilters/Filter.jsx';

const filtersData = {
  filter: {
    id: 'funny',
    label: 'funny',
  },
};

describe('Filter', () => {
  describe('Default component', () => {
    let component;

    before(() => {
      component = mount(
        <Filter />
      );
    });

    it('should not render if there is no filter prop', () => {
      expect(component.find('li').length).to.equal(0);
    });
  });

  describe('Default inactive component with filter prop', () => {
    let component;

    before(() => {
      component = mount(
        <Filter filter={filtersData.filter} />
      );
    });

    it('should render a list item with a .filter-item class', () => {
      expect(component.find('li').length).to.equal(1);
      expect(component.find('li').hasClass('filter-item')).to.equal(true);
    });

    it('should render a button with the filter\'s label', () => {
      expect(component.find('button').length).to.equal(1);
      expect(component.find('button').hasClass('nypl-primary-button')).to.equal(true);
      expect(component.find('button').hasClass('active')).to.equal(false);
      expect(component.find('button').text()).to.equal('funny');
    });

    it('should not render any SVG component', () => {
      expect(component.find('svg').length).to.equal(0);
    });

    it('should have an inactive initial state', () => {
      expect(component.state('activeClass')).to.equal('');
    });
  });

  describe('Default active component with filter prop', () => {
    let component;

    before(() => {
      component = mount(
        <Filter filter={filtersData.filter} active />
      );
    });

    it('should render a button with the filter\'s label', () => {
      expect(component.find('button').length).to.equal(1);
      expect(component.find('button').hasClass('nypl-primary-button')).to.equal(true);
      expect(component.find('button').hasClass('active')).to.equal(true);
      expect(component.find('button').text()).to.equal('Close Iconfunny');
    });

    it('should render the XIcon SVG component', () => {
      expect(component.find('svg').hasClass('check-solo-icon')).to.equal(false);
      expect(component.find('svg').hasClass('x-icon')).to.equal(true);
    });

    it('should have an active initial state', () => {
      expect(component.state('activeClass')).to.equal('active');
    });
  });

  describe('Update the props', () => {
    let component;

    before(() => {
      component = mount(
        <Filter filter={filtersData.filter} />
      );
    });

    it('should be inactive by default', () => {
      expect(component.state('activeClass')).to.equal('');
      expect(component.find('svg').length).to.equal(0);
    });

    it('should become active when passing new props', () => {
      component.setProps({ active: true });

      expect(component.state('activeClass')).to.equal('active');
      expect(component.find('svg').hasClass('x-icon')).to.equal(true);
    });

    it('should become inactive when passing new props', () => {
      component.setProps({ active: false });

      expect(component.state('activeClass')).to.equal('');
      expect(component.find('svg').length).to.equal(0);
    });
  });

  describe('OnClick function', () => {
    let component;
    let testFilterId = '';
    let testActive = false;
    const onClick = (filterId, active) => {
      testFilterId = filterId;
      testActive = active;
    };

    before(() => {
      component = mount(
        <Filter filter={filtersData.filter} onClick={onClick} />
      );
    });

    it('should call the `onClick` prop function', () => {
      expect(testFilterId).to.equal('');
      expect(testActive).to.equal(false);

      component.find('button').simulate('click');

      expect(testFilterId).to.equal('funny');
      expect(testActive).to.equal(true);
    });
  });

  describe('Active and selected filter', () => {
    let component;

    before(() => {
      component = mount(
        <Filter filter={filtersData.filter} />
      );
    });

    it('should be inactive by default', () => {
      expect(component.state('activeClass')).to.equal('');
      expect(component.find('svg').length).to.equal(0);
    });

    it('should be in the transition state when passing new props', () => {
      component.setProps({
        active: true,
        focusId: 'funny',
      });

      expect(component.state('activeClass')).to.equal('transition');
    });
  });
});
