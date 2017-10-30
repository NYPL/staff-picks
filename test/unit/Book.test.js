/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Book from '../../src/app/components/Book/Book.jsx';

describe('Book Component', () => {
  describe('Default component without data', () => {
    let component;

    before(() => {
      component = mount(<Book />);
    });

    it('should not render the Book component if the pick object prop is not defined', () => {
      expect(component.find('.book-item').length).to.equal(0);
    });
  });
});
