/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import BookFilters from '../../src/app/components/BookFilters/BookFilters.jsx';

const filtersArray = ['Funny', 'Offbeat', 'Middle Grade', 'Graphic Novels'];
const selectableFilters = ['funny', 'graphic-novels'];

describe('BookFilters', () => {
  describe('Default component', () => {
    let component;

    before(() => {
      component = mount(<BookFilters />);
    });

    it('should not render if there is no filter prop', () => {
      expect(component.find('.book-filters').length).to.equal(0);
    });
  });

  describe('With just filters prop data', () => {
    let component;

    before(() => {
      component = mount(
        <BookFilters filters={filtersArray} />
      );
    });

    it('should have a .book-filters wrapper', () => {
      const bookFiltersWrapper = component.find('div').at(0);
      expect(bookFiltersWrapper.hasClass('book-filters')).to.equal(true);
    });

    it('should render a heading and an h2 inside of it', () => {
      const heading = component.find('.book-filters-heading');
      expect(heading.length).to.equal(1);
      expect(heading.find('h2').length).to.equal(1);
      expect(heading.find('h2').text()).to.equal('NYPL Filter SVG Icon Filter by Tags');
    });

    it('should render a `ul`', () => {
      expect(component.find('ul').length).to.equal(1);
    });

    it('should map the filters data', () => {
      expect(component.state('filters')).to.eql([
        { id: 'funny', label: 'Funny' },
        { id: 'offbeat', label: 'Offbeat' },
        { id: 'middle-grade', label: 'Middle Grade' },
        { id: 'graphic-novels', label: 'Graphic Novels' },
      ]);
    });

    it('should render the filters passed in as list items', () => {
      const filterListItem = component.find('li');

      expect(filterListItem.length).to.equal(4);
      expect(filterListItem.at(0).text()).to.equal('NYPL Check Solo SVG Icon Funny');
      expect(filterListItem.at(1).text()).to.equal('NYPL Check Solo SVG Icon Offbeat');
      expect(filterListItem.at(2).text()).to.equal('NYPL Check Solo SVG Icon Middle Grade');
      expect(filterListItem.at(3).text()).to.equal('NYPL Check Solo SVG Icon Graphic Novels');
    });

    it('should not render the `clear filters` button', () => {
      expect(component.find('.clear-button').length).to.equal(0);
    });
  });

  describe('Updating the rendered filters based on the selectableFilters prop', () => {
    let component;

    before(() => {
      component = mount(
        <BookFilters filters={filtersArray} selectableFilters={selectableFilters} />
      );
    });

    it('should update the state and the filters rendered', () => {
      const filterListItem = component.find('li');

      expect(filterListItem.length).to.equal(2);
      expect(filterListItem.at(0).text()).to.equal('NYPL Check Solo SVG Icon Funny');
      expect(filterListItem.at(1).text()).to.equal('NYPL Check Solo SVG Icon Graphic Novels');
      // The state should still stay the same, but the list of actual filters to render reduces.
      expect(component.state('filters')).to.eql([
        { id: 'funny', label: 'Funny' },
        { id: 'offbeat', label: 'Offbeat' },
        { id: 'middle-grade', label: 'Middle Grade' },
        { id: 'graphic-novels', label: 'Graphic Novels' },
      ]);
    });
  });
});
