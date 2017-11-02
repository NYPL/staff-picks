import React from 'react';

import appConfig from '../../../../appConfig';

const { aboutUrls } = appConfig;

const Sidebar = () => (
  <div className="about nypl-row">
    <h2>Additional Information</h2>
    <p>Many of these titles are available in formats for <a href={aboutUrls.print}>patrons
    with print disabilities.</a></p>
    <p><a href={aboutUrls.about}>About Best Books</a></p>
    <ul>
      <li>Facebook icon</li>
      <li>Twitter icon</li>
    </ul>
  </div>
);

Sidebar.propTypes = {};

export default Sidebar;
