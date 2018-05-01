    // it('should have an h2', () => {
    //   expect(component.find('h2').length).to.equal(1);
    //   expect(component.find('h2').text()).to.equal(' Picks for 0 Books Found');
    // });

      // expect(component.find('h2').text()).to.equal(' Picks for 0 Books Found');

      // component.setProps({ displayInfo, picksCount: 3, displayInfo });
      // expect(component.find('h2').text()).to.equal('Winter 2017 Picks for Adult3 Books Found');

      // component.setProps({ picksCount: 453 });
      // expect(component.find('h2').text()).to.equal('Winter 2017 Picks for Adult453 Books Found');

/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ListTitle from '../../src/app/components/ListTitle/ListTitle';

describe('ListTitle', () => {
  describe('Deafult without any data passed', () => {
    let component;

    before(() => {
      component = shallow(<ListTitle />);
    });

    after(() => {
      component.unmount();
    });

    it('should render null', () => {
      expect(component.get(0)).to.equal(null);
    });
  });

  describe('with valid data', () => {
    let component;
    const displayInfo = {
      displayDate: {
        month: 'Winter',
        year: '2018',
      },
      displayAge: 'Children',
    };
    const picksCount = 24;
    const idPrefix = 'sidebar';

    before(() => {
      component = shallow(
        <ListTitle displayInfo={displayInfo} picksCount={picksCount} idPrefix={idPrefix} />
      );
    });

    after(() => {
      component.unmount();
    });

    it('should have an h2', () => {
      expect(component.find('h2').length).to.equal(1);
      expect(component.find('h2').text()).to.equal('Winter 2018 Picks for Children24 Books Found');
      expect(component.find('h2').nodes[0].props.id).to.equal('sidebar-list-title');
    });

    it('should have a span', () => {
      expect(component.find('span').length).to.equal(1);
      expect(component.find('span').text()).to.equal('24 Books Found');
    });
  });
});
