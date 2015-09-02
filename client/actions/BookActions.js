// ACTIONS
import alt from '../alt.js';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

class StaffPicks {
  loadPicks() {
    let options = {
      endpoint: 'http://dev.refinery.aws.nypl.org/api/nypl/ndo/v0.1/staff-picks/' +
        'staff-pick-lists?fields[staff-pick-tag]=tag&fields[staff-pick-age]=age&' +
        'fields[staff-pick-item]=title,author,catalog-slug,image-slug,tags,ebook-' +
        'uri&page[limit]=1&include=previous-list,next-list,picks.item.tags,picks.age',
      includes: ['previous-list', 'next-list', 'picks.item.tags', 'picks.age']
    };
    var self = this;

    parser.setChildrenObjects(options);

    axios
      .get('/api/picks')
      .then(res => {
        self.actions.updatePicks(res.data);
      });
  }

  updatePicks(picks) {
    this.dispatch(picks);
  }

  updateBookDisplay(displayType) {
    this.dispatch(displayType);
  }

  updateFilterAge(age) {
    this.dispatch(age);
  }

  toggleBookFilter(filter) {
    this.dispatch(filter);
  }

  clearFilters() {
    this.dispatch(true);
  }

  updateNewFilters(filters) {
    this.dispatch(filters);
  }
};

export default alt.createActions(StaffPicks);
