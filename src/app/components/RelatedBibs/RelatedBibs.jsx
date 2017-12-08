import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import testData from './testData.js';

class RelatedBibs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      bibs: [],
    };

    this.renderbib = this.renderBib.bind(this);
  }

  componentDidMount() {
    // Parse whatever encore url will be
    this.setState({ url: window.location.pathname.substring(14) })

    // axios.get()
    this.setState({
      bibs: testData,
    });
  }

  renderBib(bib) {
    return (
      <div>
        <h3>{bib.title}</h3>
        <p>{bib.author}</p>
      </div>
    );
  }

  render() {
    console.log(this.state.bibs)

    if (!this.state.bibs && !this.state.bibs.length) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {
          this.state.bibs.map(bib => this.renderBib(bib))
        }
      </div>
    );
  }
}

RelatedBibs.propTypes = {
  pick: PropTypes.object,
  isJsEnabled: PropTypes.bool,
};

export default RelatedBibs;
