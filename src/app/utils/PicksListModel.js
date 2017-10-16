import {
  isArray as _isArray,
  isEmpty as _isEmpty,
  isObject as _isObject,
  map as _map,
} from 'underscore';
import PicksModel from './PicksModel.js';

function PicksListModel() {
  this.build = data => {
    if (!data) {
      return;
    }

    if (_isArray(data) && data.length > 0) {
      return _map(data, this.picksListModel);
    } else if (_isObject(data) && !_isEmpty(data)) {
      return this.picksListModel(data);
    }

    return;
  };

  // The main modeling function
  this.picksListModel = data => {
    const picksList = {};

    if (!data) {
      return picksList;
    }

    picksList.id = data.id;
    picksList.type = data.type;
    picksList.date = data.attributes['list-date'];
    picksList.listType = data.attributes['list-type'];
    picksList.picks = PicksModel.build(data.picks);
    picksList.previousList = this.monthRelationship(data['previous-list']);
    picksList.nextList = this.monthRelationship(data['next-list']);

    return picksList;
  };

  this.monthRelationship = data => {
    const list = {};

    if (!data) {
      return list;
    }

    list.id = data.id;
    list.type = data.type;
    list.date = data.attributes['list-date'];
    list.listType = data.attributes['list-type'];

    return list;
  };
}

export default new PicksListModel();
