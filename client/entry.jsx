'use strict';
import 'styles/main.scss';
import React from 'react/addons';

// NYPL Components
import Header from 'components/Header/Header.jsx';
import Hero from 'components/Hero/Hero.jsx';
import Footer from 'dgx-react-footer';

// Utilities
import initData from 'headerData/HeaderData.js';
import API from 'utils/ApiService';

/* Sets data to local storage */
// Main purpose is to simulate an endpoint
// where our data will come from i.e. Refinery
initData();

/* Reads from local storage (i.e. Refinery) */
// If we follow the FLUX architecture
// data would not be defined, instead we would
// load the data via Store Actions and update our
// App Constants. As of now, we are mocking an API
// call to fetch the data.
const data = API.getData();
const books = API.getBooks();

React.render(<Header data={data} />, document.getElementById("header-container"));
React.render(<Hero />, document.getElementById('hero'));
React.render(<Footer />, document.getElementById("footer-container"));

