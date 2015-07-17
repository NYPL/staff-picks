// A simple API object with a getData() method.
// Ideally, the data reciceved SHOULD be added to our
// Application Store. That will be the central single point
// of reference for our data. For now, returning it and passing
// it to the component.

const API = {
  getData() {
    const data = JSON.parse(localStorage.getItem('header-data'));
    return data;
  },
  getBooks() {
    const books = staffPicks;
    console.log(books);
    return books;
  },
  getFilters() {
    const filterList = filters.filters;
    return filterList;
  }
};

export default API;
