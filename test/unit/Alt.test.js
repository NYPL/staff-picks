/* eslint-env mocha */
import { expect } from 'chai';

import sinon from 'sinon';
import alt from '../../src/app/alt';
import actions from '../../src/app/actions/BookActions.js';
import store from '../../src/app/stores/BookStore.js';

/*
 * getDispatcherArguments
 * Results of Actions are stored in an array so they must be obtained sequentially.
 * @param {object} dispatcherSpy Sinon spy for the Alt dispatcher object.
 * @param {number} num The offset of the action called.
 * @returns {object} object with the name and data of that the Action was called with.
 */
const getDispatcherArguments = (dispatcherSpy, num) => dispatcherSpy.args[num][0];

const picks = [
  {
    author: 'name',
    title: 'book title',
  },
  {
    author: 'name',
    title: 'book title',
  },
];
const filters = ['offbeat', 'funny', 'historical'];
const selectableFilters = ['offbeat', 'funny'];
describe('Alt', () => {
  describe('Actions', () => {
    let dispatcherSpy;

    before(() => {
      dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
    });

    after(() => {
      alt.dispatcher.dispatch.restore();
    });

    it('should pass data to updatePicks Action', () => {
      const action = actions.UPDATE_PICKS;

      // Trigger the action with data.
      actions.updatePicks(picks);

      // Get the payload passed to the dispatcher.
      // Note, the offset must match the order that the action was called.
      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 0);

      // Test that the correct name of the action was called with the expected data.
      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql(picks);
    });

    it('should pass data to updateFilters Action', () => {
      const action = actions.UPDATE_FILTERS;

      actions.updateFilters(filters);

      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 1);

      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql(filters);
    });

    it('should pass data to setSelectableFilters Action', () => {
      const action = actions.SET_SELECTABLE_FILTERS;

      actions.setSelectableFilters(selectableFilters);

      const dispatcherArgs = getDispatcherArguments(dispatcherSpy, 2);

      expect(dispatcherArgs.action).to.equal(action);
      expect(dispatcherArgs.data).to.eql(selectableFilters);
    });
  });

  describe('Store', () => {
    it('should pass data to updatePicks Action', () => {
      const oldSearchResults = store.getState().currentPicks;
      const action = actions.UPDATE_PICKS;
      const data = {};

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data });
      const newSearchResults = store.getState().currentPicks;

      // Since the action was already fired in a previous test, and we're using the same
      // instance, these tests are to verify that data updated and not caring so much
      // about what the actual data was.
      expect(oldSearchResults).to.eql(picks);
      expect(newSearchResults).to.eql({});
    });

    it('should pass data to updateFilters Action', () => {
      const oldSearchKeywords = store.getState().filters;
      const action = actions.UPDATE_FILTERS;
      const data = ['graphic-novels'];

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data });
      const newSearchKeywords = store.getState().filters;

      expect(oldSearchKeywords).to.eql(filters);
      expect(newSearchKeywords).to.eql(['graphic-novels']);
    });

    it('should pass data to setSelectableFilters Action', () => {
      const oldBib = store.getState().selectableFilters;
      const action = actions.SET_SELECTABLE_FILTERS;
      const data = {};

      // Dispatching new data.
      alt.dispatcher.dispatch({ action, data });
      const newBib = store.getState().selectableFilters;

      expect(oldBib).to.eql(selectableFilters);
      expect(newBib).to.eql({});
    });
  });
});
