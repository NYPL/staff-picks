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

    it('should be wrapped in an .Hero class', () => {
      expect(component.find('.Hero').length).to.equal(1);
    });
  });
});
