/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Hero from '../../src/app/components/Hero/Hero.jsx';

describe('Hero', () => {
  describe('Default', () => {
    let component;

    before(() => {
      component = shallow(<Hero heroData={{}} />);
    });

    it('should be wrapped in an .hero class', () => {
      expect(component.find('.hero').length).to.equal(1);
    });
  });
});
