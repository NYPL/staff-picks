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

  describe('Clicking on the clear filters button', () => {
    let component;

    before(() => {
      component = mount(
        <BookFilters filters={filtersArray} selectableFilters={selectableFilters} />
      );
      component.setState({ activeIds: ['funny', 'graphic-novels'] });
    });

    it('should render a clear filters button', () => {
      expect(component.find('.clear-button').length).to.equal(1);
    });

    it('should remove all active ids from the state', () => {
      component.find('.clear-button').simulate('click');

      expect(component.state('activeIds')).to.eql([]);
    });
  });

  describe('Methods', () => {
    describe('getActiveIds', () => {
      let component;
      let getActiveIds;

      before(() => {
        component = mount(
          <BookFilters filters={filtersArray} selectableFilters={selectableFilters} />
        );
        getActiveIds = component.instance().getActiveIds;
      });

      it('should be empty since the `active` param was not passed and is false', () => {
        expect(getActiveIds()).to.eql([]);
      });

      it('should return an array with the filter id passed', () => {
        expect(getActiveIds('funny', true)).to.eql(['funny']);
      });

      it('should remove the filter id from the state array', () => {
        component.setState({ activeIds: ['funny', 'graphic-novels'] });

        expect(component.state('activeIds')).to.eql(['funny', 'graphic-novels']);
        expect(getActiveIds('funny', false)).to.eql(['graphic-novels']);

        // Manually removing 'funny' from the state since that's taken care of
        // by the `onClick` function and that's not being used in this test.
        component.setState({ activeIds: ['graphic-novels'] });
        expect(component.state('activeIds')).to.eql(['graphic-novels']);
        expect(getActiveIds('graphic-novels', false)).to.eql([]);
      });
    });

    describe('getFilterArray', () => {
      const filters = [
        { id: 'funny', label: 'Funny' },
        { id: 'offbeat', label: 'Offbeat' },
        { id: 'middle-grade', label: 'Middle Grade' },
        { id: 'graphic-novels', label: 'Graphic Novels' },
      ];
      let component;
      let getFilterArray;

      before(() => {
        component = mount(
          <BookFilters filters={filtersArray} selectableFilters={selectableFilters} />
        );
        getFilterArray = component.instance().getFilterArray;
      });

      it('should return the filters passed since the selectableFilters array is empty', () => {
        expect(getFilterArray([], filters)).to.eql(filters);
      });

      it('should return an array with only the values from the selectableFilters array', () => {
        expect(getFilterArray(['funny', 'middle-grade'], filters))
          .to.eql([
            { id: 'funny', label: 'Funny' },
            { id: 'middle-grade', label: 'Middle Grade' },
          ]);
      });
    });

    describe('onClick', () => {
      let component;
      let onClick;
      let globalFilterId;
      let globalActive;
      const setSelectedFilterFn = (filterId, active) => {
        globalFilterId = filterId;
        globalActive = active;
      };

      before(() => {
        component = mount(
          <BookFilters
            filters={filtersArray}
            selectableFilters={selectableFilters}
            setSelectedFilter={setSelectedFilterFn}
          />
        );
        onClick = component.instance().onClick;
      });

      afterEach(() => {
        globalActive = undefined;
        globalFilterId = undefined;

        component.setState({
          activeIds: ['funny', 'adventure', 'offbeat'],
          focusId: '',
        });
      });

      it('should update the activeIds and focusId state if it clicked/selected', () => {
        expect(component.state('activeIds')).to.eql([]);
        expect(component.state('focusId')).to.eql('');

        onClick('adventure', true);

        expect(component.state('activeIds')).to.eql(['adventure']);
        expect(component.state('focusId')).to.eql('adventure');
      });

      it('should update the activeIds and focusId state if it clicked/unselected', () => {
        expect(component.state('activeIds')).to.eql(['funny', 'adventure', 'offbeat']);
        expect(component.state('focusId')).to.eql('');

        onClick('adventure', false);

        expect(component.state('activeIds')).to.eql(['funny', 'offbeat']);
        expect(component.state('focusId')).to.eql('adventure');
      });

      it('should call the `setSelectedFilter` prop function', () => {
        expect(globalFilterId).to.equal(undefined);
        expect(globalActive).to.equal(undefined);

        onClick('historic', true);

        expect(globalFilterId).to.equal('historic');
        expect(globalActive).to.equal(true);
      });
    });
  });
});
