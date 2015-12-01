import _ from 'underscore';

function PickItemModel() {
  this.build = data => {
    if (!data) {
      return;
    }

    if (_.isArray(data) && data.length > 0) {
      return _.map(data, this.pickItem);
    } else if (_.isObject(data) && !_.isEmpty(data)) {
      return this.pickItem(data);
    } else {
      return;
    }
  };

  this.pickItem = data => {
    let item = {};

    if (!data) {
      return item;
    }

    item.id = data.id;
    item.type = data.type;
    
    item.title = data.attributes.title;
    item.author = data.attributes.author;
    item.catalogSlug = data.attributes['catalog-slug'];
    item.imageSlug = data.attributes['image-slug'];
    item.ebookUri = data.attributes['ebook-uri'] ? 
      data.attributes['ebook-uri']['full-uri'] : undefined;
    item.tags = this.tags(data.tags);

    return item;
  };

  this.tags = data => {
    let tags = [];

    if (!data) {
      return tags;
    }

    tags = _.map(data, this.tag);

    return tags;
  };

  this.tag = data => {
    let tag = {};

    if (!data) {
      return tag;
    }

    tag.id = data.id;
    tag.type = data.type;
    tag.tag = data.attributes.tag;

    return tag;
  };
}

export default new PickItemModel();
