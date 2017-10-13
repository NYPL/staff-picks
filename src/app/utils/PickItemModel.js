import {
  isArray as _isArray,
  isEmpty as _isEmpty,
  isObject as _isObject,
  map as _map
} from 'underscore';

function PickItemModel() {
  this.build = data => {
    if (!data) {
      return;
    }

    if (_isArray(data) && data.length > 0) {
      return _map(data, this.pickItem);
    } else if (_isObject(data) && !_isEmpty(data)) {
      return this.pickItem(data);
    } else {
      return;
    }
  };

  this.pickItem = data => {
    const item = {};

    if (!data) {
      return item;
    }

    item.id = data.id;
    item.type = data.type;

    item.title = data.attributes.title;
    item.author = data.attributes.author;
    item.catalogSlug = data.attributes['catalog-slug'] ?
      data.attributes['catalog-slug'] : undefined;
    item.imageSlug = data.attributes['image-slug'] ?
      data.attributes['image-slug'] : undefined;
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

    tags = _map(data, this.tag);

    return tags;
  };

  this.tag = data => {
    const tag = {};

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
