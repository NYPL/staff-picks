// A simple API object with a getData() method.
// Ideally, the data reciceved SHOULD be added to our
// Application Store. That will be the central single point
// of reference for our data. For now, returning it and passing
// it to the component.
import _ from 'underscore';

const API = {
  getData() {
    const data = JSON.parse(localStorage.getItem('header-data'));
    return data;
  },
  getBooks() {
    const books = staffPicks['staff-picks'] || [];
    return books;
  },
  getFilters() {
    const filterList = filters.filters;
    return filterList;
  },
  getFeaturedPicks() {
    const featuredPickList = pickList['staff-picks-list'];
    const featuredBooks = featuredPickList[0].relationships.features.data;

    let booksRaw = [], books = {};

    _.each(featuredBooks, function (book) {
      booksRaw.push(_.findWhere(staffPicks['staff-picks'], book));
    });

    _.each(booksRaw, function (book) {
      var age = book['staff-pick-age']['attributes']['age'];
      books[age] = book;
    });
    return books;
  }
};

export default API;
