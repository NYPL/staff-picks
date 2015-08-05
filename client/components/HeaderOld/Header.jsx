// Non-NYPL module imports
import React from 'react';
import Radium from 'radium';

// NYPL module imports
import SimpleButton from '../Buttons/SimpleButton.jsx';
import cookie from 'react-cookie';
import cx from 'classnames';

import SSOformOld from '../SSOform/SSOformOld.jsx';

class Header extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      username: this._login(),
      logged_in: !!this._login(),
      remember: this._remember_me(),
      showDialog: false
    };

    this._handleClick = this._handleClick.bind(this);
    this._login = this._login.bind(this);
    this._removeSSOLogin = this._removeSSOLogin.bind(this);
    this._handleMobileLogOut = this._handleMobileLogOut.bind(this);
  }

  componentDidMount () {
    let _this = this;
    $('.nav-open-button').click(function () {
      $(this).toggleClass('open');
      $('.search-open-button').removeClass('open');
      $('#search-block-form-input').removeClass('open-search');
      $('#search-top').removeClass('open');
      $('#main-nav').toggleClass('open-navigation');
      _this._removeSSOLogin();
      return false;
    });

    // For mobile devices: opens/closes the search block.  
    // If the drop down menu is opened, it will close.
    $('.search-open-button').click(function () {
      $(this).toggleClass('open');
      $('.nav-open-button').removeClass('open');
      $('#main-nav').removeClass('open-navigation');
      $('#search-block-form-input').toggleClass('open-search');
      $('#search-top').toggleClass('open');
      _this._removeSSOLogin();
      return false;
    });

    $('.dropDown').hover(
      function () {
        $(this).addClass('openDropDown');
      },
      function () {
        $(this).removeClass('openDropDown');
      }
    );

    (function ($) {

      var o = {}, methods = {
        init: function (options) {
          // Close open pseudo-select when user clicks outside
          (function (search) {
            $('html').click(function () {
              search.each(function () {
                $(this).find('.pseudo-select')
                  .removeClass('open');
                $(this).find('.error').removeClass('error');
              });
            });
          }(this));

          return this.each(function () {
            var lmnt = $(this),
              mobile_hidden = lmnt.find('.hidden-xs').eq(0);

            o.term = lmnt.find('#search-block-form-input');
            o.search_button = lmnt.find('.search-button');
            o.choices = lmnt.find('.pseudo-select');
            o.mobile_flag = lmnt.find('.hidden-xs').eq(0);
            o.prompt = {
              default_val: o.term.attr("placeholder"),
              catalog: "Search the catalog",
              site: "Search NYPL.org"
            };

            // Don't let clicks get out of the search box
            lmnt.click(function (e) {
              e.stopPropagation();
            });

            // Override default submit, fire search button click event 
            // instead
            lmnt.find('form').submit(function () {
              o.search_button.click();
              return false;
            });

            // Open search scope pane when you click into the
            // search input
            o.term.focus(function (e) {
              o.choices.addClass('open');

              // Add google analytics tracking (Category, Action, Label)
              //ga('send', 'event', 'Header Search', 'Focused', 'Search Box');
            });

            // If the error class has been set on the input box, remove it
            // when the user clicks into it
            o.term.focus(function () {
              methods.clear_error();
            });

            // Setup click action on submit button.
            lmnt.find('.search-button').click(function () {
              return methods.do_search();
            });

            // Setup click action on radio butons
            o.choices.find('li input').click(function () {
              // Track selected radio button (catalog or nypl.org)
              //ga('send', 'event', 'Header Search', 'Select', methods.get_choice());
              methods.set_prompt(this);
            });

            // Setup click action on list items (will be active when items are
            // as buttons on narrow screens
            o.choices.find('li').click(function () {
              if (methods.is_mobile()) {
                if (methods.search_term().length === 0) {
                  methods.set_error();
                } else {
                  methods.do_search(methods.get_choice(this));
                }
              }
            });
          });
        },

        // Set search box placeholder based on selected item
        set_prompt: function (lmnt) {
          var item = $(lmnt).closest('li');
          if (item.hasClass('search-the-catalog')) {
            return o.term.attr('placeholder', o.prompt.catalog);
          }

          if (item.hasClass('search-the-website')) {
            return o.term.attr('placeholder', o.prompt.site);
          }

          return o.term.attr('placeholder', o.prompt.default_val);
        },

        // Get the search term from the input box. Returns '' if the
        // term is undefined
        search_term: function () {
          return $.trim(o.term.val());
        },

        // Set error state in the search input box
        set_error: function (err) {
          if (err === undefined) {
            err = 'Please enter a search term';
          }
          return o.term.addClass('error').attr('placeholder', err);
        },

        // Clear error state in the search input box
        clear_error: function () {
          return o.term.removeClass('error').attr('placeholder', '');
        },

        // The element referred to by mobile_flag should be hidden by
        // a media query. Checking whether or not it is visible will tell
        // us if that mediq query is active
        is_mobile: function () {
          return !o.mobile_flag.is(':visible');
        },

        // Get text of the active search scope selection.
        // choice: optional element to use
        get_choice: function (choice) {
          if (choice === undefined) {
            choice = o.choices.find('input[type=radio]:checked').parent();
          }
          return $.trim($(choice).text()).toLowerCase();
        },

        // Execute the search
        do_search: function (scope) {
          var term = methods.search_term(),
            target;

          if (scope === undefined) {
            scope = methods.get_choice();
          }

          // Don't perform search if no term has been entered
          if (term.length === 0) {
            methods.set_error();

            // Add google analytics tracking for Empty Search
            //ga('send', 'event', 'Header Search', 'Empty Search', '');
            return false;
          }

          if (scope === 'nypl.org') {
            target = 'http://www.nypl.org/search/apachesolr_search/' + term;

            // Add google analytics tracking on submit for NYPL.org
            //ga('send', 'event', 'Header Search', 'Submit Search', term);
          } else {
            // Bibliocommons by default
            target = 'http://nypl.bibliocommons.com/search?t=smart&q='
              + term + '&commit=Search&searchOpt=catalogue';

            // Add google analytics tracking on submit for Catalog Search
            //ga('send', 'event', 'Header Search', 'Submit Catalog Search', term);
          }

          window.location = target;
          return false;
        },

        destroy : function () {}
      };

      $.fn.nypl_search = function (method) {
        if (methods[method]) {
          return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
          return methods.init.apply(this, arguments);
        }

        $.error('Method ' +  method + ' does not exist');
      };
    }(jQuery));

    var defaultInputText = 'Find books, music, movies and more',
      defaultInputText2 = 'NYPL events, locations and more',
      header_search = jQuery('#search-top').nypl_search();

    $('#catalog-redirect-form').submit(function () {
      var searchTerm = $(this).find('input#catalog-search-form-input').val(),
        formAction = $(this).attr('action'),
        catalogRedirect = formAction + '?t=smart&q=' + searchTerm +
          '&commit=Search&searchOpt=catalogue';
      window.location = catalogRedirect;
      return false;
    });

    var enews_email = $('#header-news_signup input[type=email]'),
      enews_submit = $('#header-news_signup input[type=submit]');
    
    enews_email.focus(function () {
      $('.newsletter_policy').slideDown();
    });

    enews_email.blur(function () {
      $('.newsletter_policy').slideUp();
    });

    enews_submit.click(function () {
      if (enews_email.val() === '') {
        enews_email.focus();
        return false;
      }
    });
  }

  render () {
    let showDialog = this.state.showDialog,
      downArrow = null;
    const classes = cx({ show: showDialog, hide: !showDialog });

    if (this.state.logged_in) {
      downArrow = <img className="logged-in-arrow"
        src="http://www.nypl.org/sites/all/themes/nypl_new/images/site-icons/down-triangle_15.png" />
    }

    return (
      <div>
        <header id="header">
          <div className='nypl-logo'>
            <a href='http://www.nypl.org'></a>
          </div>

          <div className="collapsed-buttons">
            <div className="button search-open-button icon-search" onClick={this._handleClick}></div>
            <div className="button nav-open-button icon-menu2" onClick={this._handleClick}></div>
          </div>

          <div className='login-donate'>
            <div className="header-newsletter-signup">
              <form id="header-news_signup" action="http://cl.exct.net/subscribe.aspx" name="subscribeForm" method="post">
                <input type="hidden" name="thx" value="http://pages.email.nypl.org/confirmation" />
                <input type="hidden" name="err" value="http://pages.email.nypl.org/confirmation" />
                <input type="hidden" name="SubAction" value="sub_add_update" />
                <input type="hidden" name="MID" value="7000413" />
                <input type="hidden" name="Email Type" value="HTML" />
                <input type="hidden" name="lid" value="1061" />
                <input type="email" className='email-input-field' name="Email Address" placeholder="Get the best of NYPL in your inbox!" />
                <input type="submit" value="SIGN UP" className="Button newsletter-submit" />
                <input type="hidden" name="Source Code" value="Homepage" />
              </form>
              <div className="newsletter_policy">
                <a href="http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy">Privacy Policy</a>
              </div>
            </div>

            <a id='login' className='login-button'
              style={styles.SimpleButton} onClick={this._handleClick}>
              {this.state.username || 'Sign In'}
              {downArrow}
            </a>

            <a className='donate-button' href='https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN'>
              DONATE
            </a>

            <SSOformOld 
              className={classes}
              show={showDialog}
              display={showDialog}
              loggedIn={this.state.logged_in}
              remember={this.state.remember} />
          </div>

          <div id="search-top">
            <form action="#" acceptCharset="UTF-8" method="post" id="search-block-form">
              <fieldset className="pseudo-select">
                <ul>
                  <li className="search-the-catalog">
                    <label>
                      <input name="searchtype" type="radio" defaultChecked="checked"/>
                      Catalog
                    </label>
                  </li>
                  <li className="search-the-website">
                    <label>
                      <input name="searchtype" type="radio"/>
                      NYPL.org
                    </label>
                  </li>
                </ul>
              </fieldset>

              <input className="form-text" id="search-block-form-input" name="search_block_form" type="text" placeholder="Find books, music, movies and more" autoComplete="false"/>
              <button alt="Search" className="search-button icon-search" name="commit" title="Search"></button>
            </form>
            <div className="search-classic-catalog">
              <a href="http://catalog.nypl.org/" className="moreSearch">
                Classic Catalog
              </a>
            </div>
          </div>
        </header>
        <nav id="main-nav">
          <div className="nav-wrapper">
            <ul className="container__primary-links">
              
              <li className="dropDown">
                <a href="http://nypl.bibliocommons.com/dashboard/user_dashboard">My NYPL</a>
                <div className="dropDown_Content">
                  <ul className="top-level">
                    <li>
                      <h5>My Borrowing</h5>
                      <ul>
                        <li><a href="http://nypl.bibliocommons.com/checkedout">Checked Out</a></li>
                        <li><a href="http://nypl.bibliocommons.com/holds/index/active">Holds</a></li>
                        <li><a href="http://nypl.bibliocommons.com/fines">Fines</a></li>
                        <li><a href="http://nypl.bibliocommons.com/accountmessages">Library Messages</a></li>
                      </ul>
                    </li>
                    <li>
                      <h5>My Shelves</h5>
                      <ul>
                        <li>
                          <a href="http://nypl.bibliocommons.com/collection/show/my/library/completed" title="">Completed</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/collection/show/my/library/in_progress" title="">In progress</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/collection/show/my/library/for_later" title="">For later</a>
                        </li>
                        <li className="last">
                          <a href="http://nypl.bibliocommons.com/lists/show/mine" title="">My Lists</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h5>My Community</h5>
                      <ul>
                        <li>
                          <a href="http://nypl.bibliocommons.com/trustedsources" title="">I&#39;m Following</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/ignoredusers" title="">Ignored Users</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/recently_shared" title="">Recently Shared</a>
                        </li>
                        <li className="last">
                          <a href="http://nypl.bibliocommons.com/messages" title="">Inbox</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="dropDown">
                <a href="http://nypl.bibliocommons.com/dashboard">Explore</a>
                <div className="dropDown_Content">
                  <ul className="top-level">
                    <li>
                      <h5>New &amp; Notable</h5>
                      <ul>
                        <li>
                          <a href="http://nypl.bibliocommons.com/dashboard">Recent Activity</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/explore/index/newly_acquired?f_on_order=false">New Titles</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/explore/index/awards">Award Winners</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/explore/index/best_sellers">Bestsellers</a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <h5>Collections</h5>
                      <ul>
                        <li>
                          <a href="http://nypl.bibliocommons.com/search?q=books&amp;t=smart&amp;search_category=keyword&amp;title=Books">Books</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/ebooks">E-books &amp; Audiobooks</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/search?q=movies&amp;t=smart&amp;search_category=keyword&amp;title=Movies">Movies</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/search?t=smart&amp;search_category=keyword&amp;q=music&amp;commit=Search&amp;searchOpt=catalogue&amp;title=Music+and+R">Music &amp; Recordings</a>
                        </li>
                        <li>
                          <a href="http://nypl.bibliocommons.com/search?t=smart&amp;search_category=keyword&amp;q=periodicals&amp;commit=Search&amp;searchOpt=catalogue">Periodicals</a>
                        </li>
                        <li>
                          <a href="http://digitalgallery.nypl.org/">Images</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/collections/nypl-collections/braille-talking-books">Braille &amp; Talking Books</a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <h5>Made at NYPL</h5>
                      <ul>
                        <li><a href="http://nypl.org/blog">Blogs</a></li>
                        <li><a href="http://nypl.org/voices/audio-video">Audio &amp; Video</a></li>
                        <li><a href="http://nypl.org/voices/print-publications">Print Publications</a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="dropDown">
                <a href="http://nypl.org/collections">Research</a>
                <div className="dropDown_Content">
                  <ul className="top-level">
                    <li>
                      <h5>Electronic Resources</h5>
                      <ul>
                      <li><a href="http://nypl.org/collections/articles-databases">Articles and Databases</a></li>
                      <li><a href="http://nypl.org/events/online-exhibitions">Online Exhibitions</a></li>
                      <li><a href="http://digitalcollections.nypl.org/">Digital Collections</a></li>
                      <li><a href="http://nypl.org/collections/labs">NYPL Labs</a></li>
                      <li><a href="http://nypl.org/online_projects">Digital Projects</a></li>
                      </ul>
                    </li>

                    <li>
                      <h5>Tools and Services</h5>
                      <ul>
                        <li>
                          <a href="http://catalog.nypl.org/">Classic Catalog</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/collections/nypl-recommendations/guides">Research Guides</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/specialindexes">Indexes to NYPL Collections</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/ask-nypl/research-questions-reproductions">Get Copies</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/collections/nypl-recommendations">NYPL Recommendations</a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <h5>Collections</h5>
                      <ul>
                        <li>
                          <a href="/research-divisions">Research Divisions</a>
                        </li>
                        <li>
                          <a href="/profiles">Staff Profiles</a>
                        </li>
                        <li>
                          <a href="http://archives.nypl.org">Manuscripts and Archives</a>
                        </li>
                        <li>
                          <a href="http://wallachprintsandphotos.nypl.org/">Prints &amp; Photos Online Catalog</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/collections/nypl-collections/preservation-division">Preservation of NYPL Collections</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="dropDown">
                <a href="http://nypl.org/help">Using the Library</a>
                <div className="dropDown_Content">
                  <ul className="top-level">
                    <li>
                      <h5>Get Oriented</h5>
                      <ul>
                      <li><a href="http://nypl.org/help/library-card">Get a Library Card</a></li>
                      <li><a href="http://nypl.org/help/borrowing-materials">Borrowing</a></li>
                      <li><a href="http://nypl.org/help/finding-things">How To Find Things</a></li>
                      <li><a href="http://nypl.org/help/computers-internet-and-wireless-access">Computers</a></li>
                      <li><a href="http://nypl.org/help/community-outreach/services-for-persons-with-disabilities">Accessibility</a></li>
                      <li><a href="http://nypl.org/help/about-nypl">About the NYPL</a></li>
                      <li><a href="http://nypl.org/voices/connect-nypl">Connect with NYPL</a></li>
                      </ul>
                    </li>

                    <li>
                      <h5>Services</h5>
                      <ul>
                        <li>
                          <a href="http://nypl.org/ask-nypl">AskNYPL</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/computers-internet-and-wireless-access/reserving-computer">Reserve a PC</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/community-outreach">Community Outreach</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/ask-nypl/research-questions-reproductions">Get Copies</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/research-services/interlibrary-loan">Interlibrary Loan</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/spacerental">Space Rental</a>
                        </li>
                        <li>
                          <a href="http://shop.nypl.org/">The Library Shop</a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <h5>I am a...</h5>
                      <ul>
                        <li>
                          <a href="http://nypl.org/events/teaching-learning">Teacher</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/getting-oriented/for-job-seekers">Job Seeker</a>
                        </li>
                        <li>
                          <a href="http://smallbiz.nypl.org/">Small Business Owner</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/getting-oriented/resources-kids">Child</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/getting-oriented/resources-teens">Teen</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/community-outreach/services-for-persons-with-disabilities">Person with a Disability</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/help/community-outreach/immigrant-services">Recent Immigrant</a>
                        </li>
                        <li>
                          <a href="http://nypl.org/support">NYPL Donor</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="dropDown">
                <a href="/locations">Locations</a>
                <div className="dropDown_Content">
                  <ul>
                    <li>
                      <a href="/locations">All Locations</a>
                    </li>
                    <li>
                      <a href="/locations/schwarzman">Schwarzman Building</a>
                    </li>
                    <li>
                      <a href="/locations/lpa">Library for the Performing Arts</a>
                    </li>
                    <li>
                      <a href="/locations/schomburg">Schomburg Center</a>
                    </li>
                    <li>
                      <a href="/locations/sibl">Science, Industry and Business Library</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="dropDown">
                <a href="http://nypl.org/events">Classes &amp; Events</a>
                <div className="dropDown_Content">
                  <ul>
                    <li><a href="http://nypl.org/events/exhibitions">Current Exhibitions</a></li>
                    <li><a href="http://nypl.org/events/public-programs">Programs</a></li>
                    <li><a href="http://nypl.org/events/classes">Classes</a></li>
                    <li><a href="http://nypl.org/events/classes/adult-learning-centers">Learn English</a></li>
                    <li><a href="http://nypl.org/events/tours">Tours</a></li>
                    <li><a href="http://nypl.org/events/exhibitions-past">Past Exhibitions</a></li>
                    <li><a href="http://nypl.org/events/live-nypl">LIVE from the NYPL</a></li>
                  </ul>
                </div>
              </li>

              <li className="dropDown">
                <a href="http://nypl.org/support">Support the Library</a>
                <div className="dropDown_Content">
                  <ul>
                    <li>
                      <a href="https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amp;JServSessionIdr003=dwcz55yj27.app304a&amp;s_src=FRQ14ZZ_TNN" title="">Donate</a>
                    </li>
                    <li>
                      <a href="http://nypl.org/support/membership" title="">Membership</a>
                    </li>
                    <li>
                      <a href="http://nypl.org/help/about-nypl/volunteer-nypl" title="">Volunteer</a>
                    </li>
                    <li>
                      <a href="https://secure3.convio.net/nypl/site/Donation2?df_id=1660&amp;1660.donation=form1&amp;s_src=FRW14HM_QTNN" title="Honor and Memorial Gifts">Honor and Memorial Gifts</a>
                    </li>
                    <li>
                      <a href="http://nypl.org/support/benefit-events" title="">Benefit Events</a>
                    </li>
                    <li>
                      <a href="http://nypl.org/support/planned-giving" title="">Planned Giving</a>
                    </li>
                    <li>
                      <a href="http://shop.nypl.org/" title="">Shop</a>
                    </li>
                    <li className="last">
                      <a href="http://nypl.org/support/donate" title="">More Ways to Give</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <a href="http://nypl.org/ask-nypl">Help</a>
              </li>

              <li className="mobile-login">
                <a href="" onClick={this._handleMobileLogOut}>
                  {this.state.logged_in ? 'Log Out' : 'Log In'}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    this.setState({showDialog: !this.state.showDialog});
  }

  _removeSSOLogin() {
    this.setState({showDialog: false});
  }

  _handleMobileLogOut(e) {
    e.preventDefault();
    let current_location = window.location.href,
      logoutUrl = `https://nypl.bibliocommons.com/user/logout?destination=${current_location}`;

    if (this.state.logged_in) {
      window.location = logoutUrl;
    } else {
      this.setState({showDialog: !this.state.showDialog});
    }
  }

  _login() {
    return cookie.load('bc_username');
  }

  _remember_me() {
    return !!cookie.load('remember_me');
  }
};

Header.defaultProps = {
  lang: 'en'
};

const styles = {
  base: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '175px',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    color: 'black'
  },
  logo: {
    display: 'block',
    width: '230px',
    position: 'relative',
    left: '120px'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    right: '70px',
    fontFamily: 'Helvetica, Arial',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    display: 'flex'
  }
};

export default Radium(Header);
