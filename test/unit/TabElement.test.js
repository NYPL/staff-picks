/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import TabElement from '../../src/app/components/AgeTabs/TabElement.jsx';

describe('TabElement', () => {
  let component;

  before(() => {
    component = mount(<TabElement name="Adult" value="adult" />);
  });

  it('should be wrapped in a .tab-container__ul__element class', () => {
    expect(component.find('.tab-container__ul__element').length).to.equal(1);
    expect(component.find('li').first().hasClass('tab-container__ul__element')).to.equal(true);
  });

  it('should have an link', () => {
    expect(component.find('a').length).to.equal(1);
    expect(component.find('a').text()).to.equal('Adult');
  });
});
