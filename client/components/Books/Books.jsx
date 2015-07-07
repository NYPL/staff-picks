import React from 'react';
import Radium from 'radium';
import MasonryMixin from 'react-masonry-mixin';
import Book from '../Book/Book.jsx';
import API from '../../utils/ApiService.js';

let bookData = API.getBooks();
console.log(bookData);

let masonryOptions = {
  isResizable: true,
  isFitWidth: false,
  columnWidth: 150,
  itemSelector: '.book-item',
  gutter: 20
};

// class Books extends React.Component {
var Books = React.createClass({
  // Constructor used in ES6
  // constructor(props) {
  //   super(props);
  // }

  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  render: function () {
    var books = bookData['staff-picks'].map(function (element){
      return (
        <div className='book-item' style={styles.bookItem}>
          <Book book={element} />
        </div>
      );
    });

    return (
      <div ref="masonryContainer" width='600px'>
        {books}
      </div>
    );
  }
});

Books.defaultProps = {
  className: 'Books',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {

  },
  bookItem: {
    marginBottom: '20px'
  }
};

export default Radium(Books);
