import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import testData from './testData.js';
import BookStore from '../../stores/BookStore';
import Slider from 'react-slick';

function extractIsbns(bib) {
  var isbns = [];

  bib.varFields.forEach((varField) => {
    if (varField.fieldTag === 'i' && varField.marcTag === '020') {
      const isbn = varField.subfields[0].content.substr(0, varField.subfields[0].content.indexOf(' '));

      if (isbn) {
        isbns.push(isbn);
      }
    }
  });

  return isbns;
}

function extractPublisher(bib) {
  var publisher = '';

  bib.varFields.forEach((varField) => {
    if (varField.fieldTag === 'b' && varField.marcTag === '710') {
      publisher = varField.subfields[0].content;
    }
  });

  return publisher;
}

function extractIsbns(bib) {
  var isbns = [];

  bib.varFields.forEach((varField) => {
    if (varField.fieldTag === 'i' && varField.marcTag === '020') {
      const isbn = varField.subfields[0].content.substr(0, varField.subfields[0].content.indexOf(' '));

      if (isbn) {
        isbns.push(isbn);
      }
    }
  });

  return isbns;
}

function extractPublisher(bib) {
  var publisher = '';

  bib.varFields.forEach((varField) => {
    if (varField.fieldTag === 'b' && varField.marcTag === '710') {
      publisher = varField.subfields[0].content;
    }
  });

  return publisher;
}

class RelatedBibs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      bibs: BookStore.getState().relatedBibs || [],
    };

    this.renderbib = this.renderBib.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BookStore.listen(this.onChange);
  }

  componentWillUnmount() {
    BookStore.unlisten(this.onChange);
  }

  onChange() {}

  renderBib(bib, i) {
    const isbns = extractIsbns(bib);
    const publisher = extractPublisher(bib);
    let imgUrl = 'https://www.nypl.org/books-music-dvds/recommendations/lists/src/client/images/book-place-holder.png';

    if (isbns[0]) {
      imgUrl = `https://contentcafe2.btol.com/ContentCafe/Jacket.aspx?&userID=NYPL49807&password=CC68707&Value=${isbns[0]}&content=S&Return=1&Type=M`;
    }
    return (
      <div key={i} className="related-bib-container">
        <a target="_parent" href={`https://browse.nypl.org/iii/encore/record/C__Rb${bib.id}`}>
          <img style={{ width: '100px' }} src={imgUrl} alt="" />
          <h3>{bib.title}</h3>
        </a>
        <p>{bib.author}</p>
        <p>{publisher}</p>
        <p>{bib.publishYear}</p>
        <p>{bib.lang.name}</p>
      </div>
    );
  }

  render() {
    if (!this.state.bibs && !this.state.bibs.length) {
      return <div>Loading...</div>;
    }
    const settings = {
      // dots: true,
      // infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
    };

    return (
      <div>
        <h2>Also at NYPL</h2>
        <Slider {...settings}>
          {this.state.bibs.map((bib, i) => this.renderBib(bib, i))}
        </Slider>
      </div>
    );
  }
}

RelatedBibs.propTypes = {
  pick: PropTypes.object,
  relatedBibs: PropTypes.array,
};

export default RelatedBibs;
