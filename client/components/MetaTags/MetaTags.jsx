// Library import
import React from 'react';
import Radium from 'radium';
import DocMeta from 'react-doc-meta';

// Component import

class MetaTags extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {    
    var tags = [
      {name: "description", content: "lorem ipsum dolor"},
      {itemProp: "name", content: "The Name or Title Here"},
      {itemProp: "description", content: "This is the page description"},
      {itemProp: "image", content: "http://www.example.com/image.jpg"},
      {name: "twitter:card", content: "product"},
      {name: "twitter:site", content: "@publisher_handle"},
      {name: "twitter:title", content: "Page Title"},
      {name: "twitter:description", content: "Page description less than 200 characters"},
      {name: "twitter:creator", content: "@author_handle"},
      {name: "twitter:image", content: "http://www.example.com/image.html"},
      {name: "twitter:data1", content: "$3"},
      {name: "twitter:label1", content: "Price"},
      {name: "twitter:data2", content: "Black"},
      {name: "twitter:label2", content: "Color"},
      {property: "og:title", content: "Title Here"},
      {property: "og:type", content: "article"},
      {property: "og:url", content: "http://www.example.com/"},
      {property: "og:image", content: "http://example.com/image.jpg"},
      {property: "og:description", content: "Description Here"},
      {property: "og:site_name", content: "Site Name, i.e. Moz"},
      {property: "og:price:amount", content: "15.00"},
      {property: "og:price:currency", content: "USD"},
      {weirdfield: "something", content: "really really cool", hello:"world", meh: "hahaha"}
    ]
    return (
      <DocMeta tags={tags}>
        
      </DocMeta>
    );
  }
}

const styles = {
};

export default Radium(MetaTags);