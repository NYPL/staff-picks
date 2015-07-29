// Non-NYPL module imports
import React from 'react';
import Radium from 'radium';

// NYPL module imports
import SimpleButton from '../Buttons/SimpleButton.jsx';
import cookie from 'react-cookie';
import cx from 'classnames';

class Header extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);

    // cookie.save('username', 'edwinguzman');
    this.state = {
      data: this.props.data,
      username: this._login(),
      logged_in: !!this._login(),
      remember: this._remember_me(),
      showDialog: false
    };

    this._handleClick = this._handleClick.bind(this);
    this._login = this._login.bind(this);
  }

  render () {
    let showDialog = this.state.showDialog;
    const classes =  cx({ show: showDialog, hide: !showDialog });

    return (
      <div>
        <header id="header">
          <div className='nypl-logo'>
            <a href='http://www.nypl.org'></a>
          </div>

          <div className="collapsed-buttons">
            <div className="button search-open-button icon-search"></div>
            <div className="button nav-open-button icon-menu2"></div>
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

            <SimpleButton
              id='login'
              className='login-button'
              label={this.state.username || 'Sign In'}
              style={styles.SimpleButton}
              onClick={this._handleClick} />

            <a className='donate-button' href='https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN'>
              DONATE
            </a>

            <div className='sso-login'>
              {!this.state.logged_in ?
                <div className='login-form'> 
                  <form action="/" method="post" id="bc-sso-login-form--2" acceptCharset="UTF-8">
                    <div>
                      <div className="form-item form-type-textfield form-item-name">
                        <label htmlFor="username">Username or bar code: </label>
                        <input type="text" id="username" name="name" value="" size="60" maxLength="128" className="form-text" autoComplete="off"
                          style={{'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+g' +
                            'vaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDiIqO1Am6gAAAb1JREFUOMvNkk1rU0EUhp8zd0gCrdKFNgiCFatiIYgUKdW6aikuh' +
                            'IJF6kJcdFFEXAclzM0XJH9A6EL8BSoqZlEQCl0GEQU/qApdiYouKmgUbu7luGgC+boUuvLdvcPMc86c88J/p2w2e9g5d7btnXNTzrlM3H3TaZxzt1' +
                            'Kp1KaI3AcEEBFZFZFXvu9XBgFsjw9EZAjIOOeWVDUUkTMAqvppEEB6ve/7GyJyAfioqpGInALWi8XibCwgl8sdMcbsbzabf621Y8aYNRHxWpUjYFF' +
                            'Vv4vIcBiGPyqVyuuuL1hrbwM3kslkf4Ud0BORnWattfeAld4hmr1uTVrTn1TVg6r6U0RGPc97DJh21V0Bncrn88+BOVV9Y4zp2v/w0RkWzo2w8aDG' +
                            '52BwDq4Ccy1b7iInJrh2fZbx8QxjQzFBAk4Aoaq+K5VKDztec3H5MmkAIppxSSyXy6UgCE5HUXQT0Pb58UvLTB34Qm1tE4CwEZ9EqtXq++6TUaYn0' +
                            'xD9YuZ8Gkgwv7LA1t2nbA8C9OsPH16+peGFpA6dZGQfbH/9RiOug379pl57RB1ITCxy58oxXjyrE8StsVOFQkF3w/8DCTuL1wm1OYIAAAAASUVORK' +
                            '5CYII=)',
                            'backgroundAttachment': 'scroll',
                            'backgroundPosition': '100% 50%',
                            'backgroundRepeat': 'no-repeat'}} />
                      </div>
                      <div className="form-item form-type-password form-item-user-pin">
                        <label htmlFor="pin">PIN: </label>
                        <input type="password" id="pin" name="user_pin" size="60" maxLength="128" className="form-text" autoComplete="off"
                          style={{'backgroundImage': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+g' +
                            'vaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDiIqO1Am6gAAAb1JREFUOMvNkk1rU0EUhp8zd0gCrdKFNgiCFatiIYgUKdW6aikuh' +
                            'IJF6kJcdFFEXAclzM0XJH9A6EL8BSoqZlEQCl0GEQU/qApdiYouKmgUbu7luGgC+boUuvLdvcPMc86c88J/p2w2e9g5d7btnXNTzrlM3H3TaZxzt1' +
                            'Kp1KaI3AcEEBFZFZFXvu9XBgFsjw9EZAjIOOeWVDUUkTMAqvppEEB6ve/7GyJyAfioqpGInALWi8XibCwgl8sdMcbsbzabf621Y8aYNRHxWpUjYFF' +
                            'Vv4vIcBiGPyqVyuuuL1hrbwM3kslkf4Ud0BORnWattfeAld4hmr1uTVrTn1TVg6r6U0RGPc97DJh21V0Bncrn88+BOVV9Y4zp2v/w0RkWzo2w8aDG' +
                            '52BwDq4Ccy1b7iInJrh2fZbx8QxjQzFBAk4Aoaq+K5VKDztec3H5MmkAIppxSSyXy6UgCE5HUXQT0Pb58UvLTB34Qm1tE4CwEZ9EqtXq++6TUaYn0' +
                            'xD9YuZ8Gkgwv7LA1t2nbA8C9OsPH16+peGFpA6dZGQfbH/9RiOug379pl57RB1ITCxy58oxXjyrE8StsVOFQkF3w/8DCTuL1wm1OYIAAAAASUVORK' +
                            '5CYII=)',
                            'backgroundAttachment': 'scroll',
                            'backgroundPosition': '100% 50%',
                            'backgroundRepeat': 'no-repeat'}} />
                      </div>
                      <div className="form-item form-type-checkbox form-item-remember-me">
                        <input type="checkbox" id="remember_me" name="remember_me" value="1" className="form-checkbox" /> <label className="option" htmlFor="remember_me">Remember me </label>
                      </div>
                      <input type="hidden" name="destination" value="http://www.nypl.org/" />
                      <input type="submit" id="login-form-submit" name="op" value="Log In" className="form-submit" />
                      <div id="login-form-help" className="login-helptext">
                        <a href="https://nypl.bibliocommons.com/user/forgot" className="forgotpin-button">Forgot your PIN?</a>
                        <a href="http://www.nypl.org/help/library-card" className="createacct-button">Need an account?</a>
                      </div>
                      <input type="hidden" name="form_build_id" value="form-tydkOKr234PQ09lFW8Ffwo3vUGLb566Rw7rNZ-BfC3E" />
                      <input type="hidden" name="form_id" value="bc_sso_login_form" />
                    </div>
                  </form>
                </div> :

                <ul className="logged-in-menu">
                  <li><a href="http://nypl.bibliocommons.com/user/account">Personal Information</a></li>
                  <li><a href="http://nypl.bibliocommons.com/user/saved_searches">Saved Searches</a></li>
                  <li><a href="http://nypl.bibliocommons.com/user/preferences">Preferences</a></li>
                  <li><a href="http://nypl.bibliocommons.com/user/privacy">Privacy</a></li>
                  <li><a href="http://nypl.bibliocommons.com/user/reminders">Reminders</a></li>
                  <li><a href="http://nypl.bibliocommons.com/communitycredits">Community Credits</a></li>
                  <li><a href="http://nypl.bibliocommons.com/carts/order_history">Order History</a></li>
                  <li><a href="#logout" id="sso-logout">Log out</a></li>
                </ul>
              }
            </div>
          </div>

          <div id="search-top">
            <form action="#" acceptCharset="UTF-8" method="post" id="search-block-form">
              <fieldset className="pseudo-select">
                <ul>
                  <li className="search-the-catalog">
                    <label>
                      <input name="searchtype" type="radio" checked="checked"/>
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
                <a href="">Log In</a>
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

  _login() {
    return cookie.load('username');
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
