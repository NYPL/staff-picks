/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ListSelector from '../../src/app/components/ListSelector/ListSelector.jsx';

const fieldsetProps = {
  season: {
    fieldsetName: 'season',
    options: [
      { name: '2018 Winter', value: '2018-01-01' },
      { name: '2017 Fall', value: '2017-09-01' },
      { name: '2017 Summer', value: '2017-06-01' },
      { name: '2017 Spring', value: '2017-04-01' },
    ],
  },
  audience: {
    fieldsetName: 'audience',
    options: [
      { name: 'Adult', value: 'adult' },
      { name: 'Teen', value: 'teen' },
      { name: 'Children', value: 'children' },
    ],
  },
};

describe('ListSelector', () => {
  describe('Default', () => {
    let component;

    before(() => {
      component = shallow(<ListSelector fieldsetProps={fieldsetProps} />);
    });

    it('should render a form, and inside the form, it should render <input>.',
      () => {
        expect(component.find('form').length).to.equal(1);
        expect(component.find('input').length).to.equal(1);
      }
    );
  });

  describe('When the selected option updates, it should make an API request to request new list.', () => {
    describe('If the request fails, it should set BookStore back to the default.', () => {});
    describe('If the request succeeds, it should update BookStore with the data responsed.', () => {});
  });
});
