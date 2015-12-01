import _ from 'underscore';
import PickItem from './PickItemModel.js';

function PicksModel() {
  this.build = data => {
    if (!data) {
      return;
    }

    if (_.isArray(data) && data.length > 0) {
      return _.map(data, this.picksModel);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.pickModel(data);
    } else {
      return;
    }
  };

  this.picksModel = data => {
    let pick = {};

    if (!data) {
      return pick;
    }

    pick.id = data.id;
    pick.type = data.type;
    pick.text = data.attributes.text;
    pick.location = data.attributes.location;
    pick.picker = data.attributes['picker-name'];

    pick.item = PickItem.build(data.item);
    pick.age = this.age(data.age);

    return pick;
  };

  this.age = data => {
    let age = {};
    
    if (!data) {
      return age;
    }

    age.id = data.id;
    age.type = data.type;
    age.age = data.attributes.age;

    return age;
  };

}

export default new PicksModel();
