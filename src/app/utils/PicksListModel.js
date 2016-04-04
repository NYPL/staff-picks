import _ from 'underscore';
import PicksModel from './PicksModel.js';

function PicksListModel() {
  this.build = data => {
    if (!data) {
      return;
    }

    if (_.isArray(data) && data.length > 0) {
      return _.map(data, this.picksListModel);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.picksListModel(data);
    } else {
      return;
    }
  };

  // The main modeling function
  this.picksListModel = data => {
    let picksList = {};

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
    let list = {};

    if (!data) {
      return;
    }

    list.id = data.id;
    list.type = data.type;
    list.date = data.attributes['list-date'];
    list.listType = data.attributes['list-type'];

    return list;
  };
}

export default new PicksListModel();
