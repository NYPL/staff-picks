/* eslint-env mocha */
import { expect } from 'chai';
import sinon from 'sinon';

import utils from '../../src/app/utils/utils';

describe('Utils functions', () => {
  describe('getPickTags', () => {
    const getPickTags = utils.getPickTags;

    it('should return an empty array', () => {
      expect(getPickTags()).to.eql([]);
    });

    it('should return an array of all the tags in the picks', () => {
      const picks = {
        title: 'third book title',
        tags: ['Graphic-novels', 'Funny'],
      };
      expect(getPickTags(picks)).to.eql(['graphic-novels', 'funny']);
    });
  });

  describe('getSelectedTags', () => {
    const getSelectedTags = utils.getSelectedTags;

    it('should return an empty array', () => {
      expect(getSelectedTags()).to.eql([]);
    });

    it('should return an array of all the tags in the picks', () => {
      const initialTags = ['funny', 'horror', 'adventure', 'offbeat', 'graphic-novels', 'classy'];
      const selectedTags = ['funny', 'offbeat'];
      expect(getSelectedTags(initialTags, selectedTags)).to.eql(['funny', 'offbeat']);
    });
  });


  describe('getAllTags', () => {
    const getAllTags = utils.getAllTags;

    it('should return an empty array', () => {
      expect(getAllTags()).to.eql([]);
    });

    it('should return an array of all the tags in the picks', () => {
      const picks = [
        {
          title: 'first book title',
          tags: ['funny', 'horror'],
        },
        {
          title: 'second book title',
          tags: ['adventure', 'horror'],
        },
        {
          title: 'third book title',
          tags: ['graphic-novels', 'funny'],
        },
        {
          title: 'fourth book title',
          tags: [],
        },
      ];
      expect(getAllTags(picks)).to.eql(['adventure', 'funny', 'graphic-novels', 'horror']);
    });
  });

  describe('capitalize', () => {
    const capitalize = utils.capitalize;

    it('should make the first character of a string uppercase.', () => {
      expect(capitalize('audience')).to.equal('Audience');
    });
  });

  describe('focusOnFirstAvailableElement', () => {
    // The IDs this test should be calling
    // const mockElementIds = ['element1', 'element2', 'element3', 'element4'];
    // The mockups of the elements that getElementById will return
    // As we will run focus() on the function, we stub a focus function to each element
    // There should not be any element with ID as "element1"
    // const mockElements = [
    //   {
    //     id: 'not-exist-element',
    //     children: [],
    //     focus: sinon.spy(),
    //   },
    //   {
    //     id: 'element2',
    //     children: [],
    //     focus: sinon.spy(),
    //   },
    //   {
    //     id: 'element3',
    //     children: [],
    //     focus: sinon.spy(),
    //   },
    //   {
    //     id: 'element4',
    //     children: [],
    //     focus: sinon.spy(),
    //   },
    // ];
    const focusOnFirstAvailableElement = utils.focusOnFirstAvailableElement;
    const getElementById = sinon.stub(document, 'getElementById');

    // Sets the stub function as the callback when calling getComputedStyle
    // So we can test the chained method of getComputedStyle().getPropertyValue('display')
    // Set two returns that have different values of styles for 'display'
    // let getPropertyValue;
    // let getPropertyValue = {
    //   getPropertyValue: sinon.stub().withArgs('display')
    //     .onCall(0).returns('none')
    //     .onCall(1).returns('none')
    //     // getPropertyValue should never be called the third time as we got the correct element
    //     // at the third time
    //     .onCall(2).returns('block')
    //     .onCall(3).returns('block'),
    // };
    // const getComputedStyle = sinon.stub(window, 'getComputedStyle').returns(getPropertyValue);
    const getComputedStyle = sinon.stub(window, 'getComputedStyle');

    // Sets three different returns when calling mockElements
    // getElementById
    //   .onCall(0).returns(null)
    //   .onCall(1).returns(mockElements[1])
    //   .onCall(2).returns(mockElements[2])
      // The last time getElementById gets called should be the time it executes focus on
      // the correct element, which is element3
      // .onCall(3).returns(mockElements[2]);

    // beforeEach(() => {
      // getElementById.resetHistory();
      // getComputedStyle.resetHistory();
      // getElementById.reset();
      // getComputedStyle.reset();
      // mockElements[0].focus.reset();
      // mockElements[1].focus.reset();
      // mockElements[2].focus.reset();
      // mockElements[3].focus.reset();
    // });

    afterEach(() => {
      getElementById.reset();
      getComputedStyle.reset();
      // mockElements[0].focus.reset();
      // mockElements[1].focus.reset();
      // mockElements[2].focus.reset();
      // mockElements[3].focus.reset();
    });

    after(() => {
      getElementById.restore();
      getComputedStyle.restore();
    });

    it('should return false if no data or empty array passed to it.', () => {
      expect(focusOnFirstAvailableElement(undefined)).to.equal(undefined);
      expect(focusOnFirstAvailableElement([])).to.equal(undefined);
    });

    // it('should focus the first available element.', () => {
    //   focusOnFirstAvailableElement(mockElementIds);

    //   // Tests which element got focused here (means focus() got called)
    //   expect(mockElements[0].focus.callCount).to.equal(0);
    //   expect(mockElements[1].focus.callCount).to.equal(0);
    //   expect(mockElements[2].focus.callCount).to.equal(1);
    //   expect(mockElements[3].focus.callCount).to.equal(0);
    // });

    it('should remain the current focus if there is no elements match the input IDs.', () => {
      // Sets the first return for calling getElementById
      getElementById.onCall(0).returns(null);

      // Runs the function
      focusOnFirstAvailableElement(['i-do-not-exist']);

      // getElementById should get called once to see if the element exists
      expect(getElementById.callCount).to.equal(1);
      // getComputedStyle should not get called because the element does not exist
      expect(getComputedStyle.callCount).to.equal(0);
    });

    it('should remain the current focus if the suggested elements are "display: none".', () => {
      const mockElement = {
        id: 'i-am-here-but-invisible',
        children: [],
        focus: sinon.spy(),
      };

      // After calling getComputedStyle, it returns the function getPropertyValue
      const mockGetPropertyValue = {
        // The first time calling getPropertyValue with "display" as the argument should return
        // "none"
        getPropertyValue: sinon.stub().withArgs('display')
          .onCall(0).returns('none'),
      };

      // Sets the returned object for calling getElementById
      getElementById.withArgs('i-am-here-but-invisible').returns(mockElement);

      // Sets the first return for calling getComputedStyle
      getComputedStyle.returns(mockGetPropertyValue);

      // Runs the function
      focusOnFirstAvailableElement(['i-am-here-but-invisible']);

      // getElementById should get called once to see if the element exists
      expect(getElementById.callCount).to.equal(1);
      // getComputedStyle should get called once because the element exists
      expect(getComputedStyle.callCount).to.equal(1);
    });

    it('should focus the first available element even if multiple suggested elements are visible.',
        () => {
          const mockElements = [
            {
              id: 'i-am-here-but-invisible',
              children: [],
              focus: sinon.spy(),
            },
            {
              id: 'i-am-here-and-visible-and-should-get-focused',
              children: [],
              focus: sinon.spy(),
            },
            {
              id: 'i-am-here-and-visible-but-should-not-get-focused',
              children: [],
              focus: sinon.spy(),
            },
          ];

          // After calling getComputedStyle, it returns the function getPropertyValue
          const mockGetPropertyValue = {
            // The returned values after calling getPropertyValue with "display" as the argument
            getPropertyValue: sinon.stub().withArgs('display')
              .onCall(0).returns('none')
              .onCall(1).returns('block')
              .onCall(2).returns('block'),
          };

          // Sets the objects for returning after calling getElementById
          getElementById.withArgs('i-am-here-but-invisible').returns(mockElements[0]);
          getElementById.withArgs('i-am-here-and-visible-and-should-get-focused')
            .returns(mockElements[1]);
          getElementById.withArgs('i-am-here-and-visible-but-should-not-get-focused')
            .returns(mockElements[2]);

          // Runs the function
          getComputedStyle.returns(mockGetPropertyValue);

          focusOnFirstAvailableElement([
            'i-am-here-but-invisible',
            'i-am-here-and-visible-and-should-get-focused',
            'i-am-here-and-visible-but-should-not-get-focused',
          ]);

          expect(getElementById.callCount).to.equal(3);
          expect(getComputedStyle.callCount).to.equal(2);
          expect(mockElements[0].focus.callCount).to.equal(0);
          expect(mockElements[1].focus.callCount).to.equal(1);
          expect(mockElements[2].focus.callCount).to.equal(0);
        }
      );
  });
});
