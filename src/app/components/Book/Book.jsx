import React from 'react';
// import radium from 'radium';

const Book = (props) => {
  const handleClick = (e) => e.preventDefault();
  const book = props.book;
  const bookImgSrc = book.item.imageSlug;
  const fullImgSrc = bookImgSrc !== 'No Image' ?
    'https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=NYPL49807' +
    `&password=CC68707&Value=${bookImgSrc}&content=M&Return=1&Type=M`
    : '/browse/recommendations/staff-picks/src/client/images/book-place-holder.png';

  return (
    <div className={props.className}>
      <a href="#" onClick={handleClick}>
        <img
          alt={book.item.title}
          src={fullImgSrc}
          height={props.height}
          width={props.width}
        />
      </a>
    </div>
  );
};

Book.propTypes = {
  book: React.PropTypes.object,
  className: React.PropTypes.string,
  height: React.PropTypes.string,
  width: React.PropTypes.string,
};

Book.defaultProps = {
  className: 'Book',
  lang: 'en',
};

export default Book;
