import alt from '../alt.js';
import Actions from '../actions/HeaderActions.js';

class HeaderStore {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSearchButtonActionValue: Actions.SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY,
      handleSetLastActiveMenuItem: Actions.SET_LAST_ACTIVE_MENU_ITEM,
      handleToggleSubscribeFormVisible: Actions.TOGGLE_SUBSCRIBE_FORM_VISIBLE
    });

    this.exportPublicMethods({
      _getMobileMenuBtnValue: this._getMobileMenuBtnValue,
      _getSearchButtonActionValue: this._getSearchButtonActionValue,
      _getIsStickyValue: this._getIsStickyValue,
      _getLastActiveMenuItem: this._getLastActiveMenuItem,
      _getSubscribeFormVisible: this._getSubscribeFormVisible
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      isSticky: false,
      lastActiveMenuItem: '',
      activeMobileButton: '',
      searchButtonAction:'',
      subscribeFormVisible: false
    };
  }

  /*** PUBLIC METHODS ***/
  /**
   * _getMobileMenuBtnValue()
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */
  _getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  /**
   * _getSubscribeFormVisible()
   * returns the current state.subscribeFormVisible
   * value.
   * @return {Boolean} true/falsse
   */
  _getSubscribeFormVisible() {
    return this.state.subscribeFormVisible;
  }

  /**
   * _getSearchButtonActionValue()
   * returns the current state.getSearchButtonActionValue
   * value.
   * @return {String}
   */
  _getSearchButtonActionValue() {
    return this.state.searchButtonAction;
  }

  /**
   * _getIsStickyValue() 
   * returns the current state.isSticky value.
   *
   * @return {Boolean} true/false
   */
  _getIsStickyValue() {
    return this.state.isSticky;
  }

  /**
   * _getLastActiveMenuItem()
   * returns the current state.lastActiveMenuItem
   * value.
   * @return {String}
   */
  _getLastActiveMenuItem() {
    return this.state.lastActiveMenuItem;
  }

  /*** PRIVATE METHODS ***/
  handleUpdateHeaderData(data) {
    this.setState({headerData: data});
  }

  handleFetchHeaderData() {
    this.setState({headerData: []});
  }

  handleHeaderDataFailedFetch(errorMessage) {
    this.setState({errorMessage: errorMessage});
  }

  handleSetMobileMenuButtonValue(currentActiveMobileButton) {
    this.setState({activeMobileButton: currentActiveMobileButton});
  }

  // The set search button action value to Store
  handleSearchButtonActionValue(actionValue) {
    this.setState({searchButtonAction: actionValue});
  }

  handleUpdateIsHeaderSticky(value) {
    this.setState({isSticky: value});
  }

  handleSetLastActiveMenuItem(value) {
    this.setState({lastActiveMenuItem: value});
  }

  handleToggleSubscribeFormVisible(value) {
    this.setState({subscribeFormVisible: value});
  }
}

// Export ALT Store
export default alt.createStore(HeaderStore, 'HeaderStore');
