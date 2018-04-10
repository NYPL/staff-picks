/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ListFilter from '../../src/app/components/ListSelector/ListFilter.jsx';

const fieldsetProps = {
  fieldsetName: 'season',
  options: [
    { name: '2018 Winter', value: '2018-01-01' },
    { name: '2017 Fall', value: '2017-09-01' },
    { name: '2017 Summer', value: '2017-06-01' },
    { name: '2017 Spring', value: '2017-04-01' },
  ],
};

describe('ListFilter', () => {
  describe('Default', () => {
    let component;

    before(() => {
      component = shallow(<ListFilter fieldsetProps={fieldsetProps} />);
    });

    it('should render a fieldset, and inside the fieldset, it should render <label> and <select>.',
      () => {
        expect(component.find('fieldset').length).to.equal(1);
        expect(component.find('label').length).to.equal(1);
        expect(component.find('select').length).to.equal(1);
      }
    );

    it('should render the <option>. The number of the option equals to the length of the data has.',
      () => {
        expect(component.find('option').length).to.equal(4);
      }
    );
  });
});
