/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ListSelector from '../../src/app/components/ListSelector/ListSelector.jsx';
import config from '../../appConfig';

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

    after(() => {
      component.unmount();
    });

    it('should render a form, and inside the form, it should render <input>.',
      () => {
        expect(component.find('form').length).to.equal(1);
        expect(component.find('input').length).to.equal(1);
      }
    );
  });

  describe('When the selected option updates,', () => {
    // Bind sinon.spy to the prototype of ListSelector, before ListSelector is mounted
    const submitFormRequest = sinon.spy(ListSelector.prototype, 'submitFormRequest');
    const component = shallow(<ListSelector fieldsetProps={fieldsetProps} />);

    before(() => {
      component.instance().handleChange({ target: { value: '2017-01' }});
    });

    after(() => {
      submitFormRequest.restore();
      component.unmount();
    });

    it('should make an API request to request a new list.', () => {
      expect(submitFormRequest.called).to.equal(true);
    });
  });

  describe('After making the API request,', () => {
    let mock = new MockAdapter(axios);
    const updateBookStore = sinon.spy(ListSelector.prototype, 'updateBookStore');
    const component = shallow(<ListSelector fieldsetProps={fieldsetProps} />);
    const mockBookListResponse = {
      date: '2017-01',
      title: 'Winter 2016 Staff Picks',
      currentPicks: {
        picks: [
          {
            ageGroup: 'Adult',
            book: {
              title: 'book 01'
            },
          },
          {
            ageGroup: 'Children',
            book: {
              title: 'book 01'
            },
          },
          {
            ageGroup: 'YA',
            book: {
              title: 'book 03'
            },
          },
        ],
      },
    };

    before(() => {
      mock
        .onGet(`${config.baseApiUrl}2099-13`)
        .reply(500, {
          statusText: 'Undefined error',
          status: 500,
        })
        .onGet(`${config.baseApiUrl}2017-01`)
        .reply(200, mockBookListResponse);
    });

    after(() => {
      updateBookStore.restore();
      mock.reset();
    });

    it('should set BookStore back to the default, if the request fails.', () => {
      component.instance().setState({ submitValue: '2099-13' });
      component.instance().submitFormRequest();
      setTimeout(
        () => {
          expect(updateBookStore.getCall(0).args).to.deep.equal([]);
        }, 0
      );
    });

    it('should update BookStore with the data responsed, if the request succeeds.', () => {
      component.instance().setState({ submitValue: '2017-01' });
      component.instance().submitFormRequest();
      setTimeout(
        () => {
          expect(updateBookStore.getCall(1).args).to.deep.equal(
            [mockBookListResponse.currentPicks, [], [],]
          );
        }, 0
      );
    });
  });
});
