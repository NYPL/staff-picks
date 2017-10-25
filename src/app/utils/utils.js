import {
  union as _union,
  contains as _contains,
  each as _each,
} from 'underscore';

import appConfig from '../../../appConfig.js';
import { gaUtils } from 'dgx-react-ga';

function Utils() {
  const unionFn = appTags => (newTags) => _union(appTags, newTags);

  this.metaTagUnion = unionFn(appConfig.metaTags);

  /**
   * trackPicks(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {string} action Action for GA event.
   * @param {string} label Label for GA event.
   */
  this.trackPicks = gaUtils.trackEvent('Staff Picks');

  /**
   * getPickTags(book)
   * Return an array of the pick's tags, lowercased and with a hyphen to easily
   * use as a class or an ID.
   *
   * @param {object} book
   */
  this.getPickTags = (book) => {
    if (!(book.tags && book.tags.length)) {
      return [];
    }
    return book.tags.map(tag => tag.toLowerCase().split(' ').join('-'));
  };

  /**
   * getSelectedTags(tagArray, selectedFilters)
   * Return an array of the filters in a pick's tagArray if the selectedFilters is found.
   *
   * @param {array} tagArray
   * @param {array} selectedFilters
   */
  this.getSelectedTags = (tagArray, selectedFilters) => {
    const selectedTags = [];
    _each(tagArray, (bookTag) => {
      if (_contains(selectedFilters, bookTag)) {
        selectedTags.push(bookTag);
      }
    });

    return selectedTags;
  };

  /**
   * getSelectableTags(picks)
   * Get the subset of tags that can be selected based on the subset of picks.
   *
   * @param {array} picks
   */
  this.getSelectableTags = (picks) => {
    let selectableFilters = [];

    _each(picks, book => {
      const tagArray = this.getPickTags(book);
      selectableFilters = _union(selectableFilters, tagArray);
    });

    return selectableFilters;
  };
}

export default new Utils();
