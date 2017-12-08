import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import testData from './testData.js';
import BookStore from '../../stores/BookStore';
import Slider from 'react-slick';

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
    return (
      <div key={i}>
        <h3>{bib.title}</h3>
      </div>
    );
  }

  render() {
    if (!this.state.bibs && !this.state.bibs.length) {
      return <div>Loading...</div>;
    }
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        {this.state.bibs.map((bib, i) => this.renderBib(bib, i))}
      </Slider>
    );
  }
}

RelatedBibs.propTypes = {
  pick: PropTypes.object,
  relatedBibs: PropTypes.array,
};

export default RelatedBibs;
