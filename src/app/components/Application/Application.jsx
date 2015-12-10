import React from 'react/addons';
import DocMeta from 'react-doc-meta';
import Router from 'react-router';

// NYPL Components
import Header from 'dgx-header-component';
import Hero from '../Hero/Hero.jsx';
import AgeTabs from '../AgeTabs/AgeTabs.jsx';
import Books from '../Books/Books.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

import utils from '../../utils/utils';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let hompageTags = [
        {property: "og:title", content: 'Staff Picks | The New York Public Library'},
        {property: "og:image", content: '/recommendations/staff-picks/client/images/shelftalker.4.2.png'},
        {property: "og:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
        {property: "og:url", content: 'http://www.nypl.org/recommendations/staff-picks/'},
        {name: "twitter:title", content: 'Staff Picks | The New York Public Library'},
        {name: "twitter:description", content: 'Every month NYPL\'s librarians share their favorite reads.'},
        {name: "twitter:image", content: '/recommendations/staff-picks/client/images/shelftalker.4.2.png'}
      ],
      tags = utils.metaTagUnion(hompageTags);

    return (
      <div>
        <DocMeta tags={tags} />
        <Header />
        <Hero />
        <div id="app-content">
          <RouteHandler {...this.props} />

          <AgeTabs {...this.props} />
          
          <div className='main-container'>
            <div id='sidebar'>
              <Sidebar filters={this.props.filters}/>
            </div>
            <div id='books'>
              <Books {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
