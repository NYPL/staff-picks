/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import BasicButton from '../../src/app/components/Buttons/BasicButton.jsx';

describe('BasicButton', () => {
  let component;

  before(() => {
    component = mount(<BasicButton />);
  });

  it('should be wrapped in button', () => {
    expect(component.find('button').length).to.equal(1);
  });
});
