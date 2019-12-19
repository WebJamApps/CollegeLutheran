import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import authUtils from './authUtils';
import mapStoreToProps from '../redux/mapStoreToAllProps';
// import appMainUtils from './appMainUtils';
import Footer from './Footer';
import menuUtils from './menuUtils';

export class AppTemplate extends Component {
  constructor(props) {
    super(props);
    this.menuUtils = menuUtils;
    this.children = props.children;
    this.state = { menuOpen: false };// eslint-disable-line
    this.close = this.close.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyMenu = this.handleKeyMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.navLinks = this.navLinks.bind(this);
    this.responseGoogleLogin = this.responseGoogleLogin.bind(this);
    this.responseGoogleLogout = this.responseGoogleLogout.bind(this);
    this.googleButtons = this.googleButtons.bind(this);
    this.authUtils = authUtils;
    // this.appMainUtils = appMainUtils;
  }

  get currentStyles() {
    let result = {};
    this.style = 'wj';
    result = {
      headerImagePath: '../static/imgs/webjamicon7.png',
      headerText1: 'Web Jam LLC',
      headerClass: 'home-header',
      headerImageClass: 'home-header-image',
      sidebarClass: 'home-sidebar',
      menuToggleClass: 'home-menu-toggle',
    };
    result.sidebarImagePath = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Lutherrose.svg/800px-Lutherrose.svg.png';
    return result;
  }

  get menus() { // eslint-disable-line class-methods-use-this
    return [
      {
        className: '', type: 'link', iconClass: 'fas fa-arrows-alt', link: '/belief', name: 'Our Lutheran Beliefs',
      },
      {
        className: '', type: 'link', iconClass: 'fas fa-users', link: '/staff', name: 'Church Staff',
      },
      {
        className: '', type: 'link', iconClass: 'fas fa-music', link: '/music', name: 'Music',
      },
      {
        className: '', type: 'link', iconClass: 'fas fa-handshake', link: '/giving', name: 'Giving',
      },
      {
        className: '', type: 'link', iconClass: 'fas fa-futbol', link: '/youth', name: 'Youth Ministry',
      },
      {
        className: '', type: 'link', iconClass: 'fas fa-child', link: '/family', name: 'Child & Families',
      },
      {
        className: '', type: 'link', iconClass: 'far fa-newspaper', link: '/news', name: 'News & Forum',
      },
      {
        className: 'home', type: 'link', iconClass: 'fas fa-heart', link: '/', name: 'Home',
      },
    ];
  }

  toggleMobileMenu() {
    const { menuOpen } = this.state;
    const mO = !menuOpen;
    this.setState({ menuOpen: mO });
  }

  // eslint-disable-next-line react/destructuring-assignment
  responseGoogleLogin(response) { return this.authUtils.responseGoogleLogin(response, this); }

  // eslint-disable-next-line react/destructuring-assignment
  responseGoogleLogout(response) { return this.authUtils.responseGoogleLogout(response, this.props.dispatch); }

  close(e) {
    this.setState({ menuOpen: false });
    if (e.target.classList.contains('loginGoogle')) return this.loginGoogle();
    return true;
  }

  handleKeyPress(e) {
    if (e.key === 'Escape') return this.setState({ menuOpen: false });
    return null;
  }

  handleKeyMenu(e) {
    if (e.key === 'Enter') return this.toggleMobileMenu();
    return null;
  }

  googleButtons(type, index) {
    const cId = process.env.GoogleClientId;
    if (type === 'login') {
      return (
        <div key={index} className="menu-item googleLogin">
          <GoogleLogin
            responseType="code"
            clientId={cId}
            buttonText="Login"
            onSuccess={this.responseGoogleLogin}
            onFailure={this.authUtils.responseGoogleFailLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
      );
    } return (
      <div key={index} className="menu-item googleLogout">
        <GoogleLogout clientId={cId} buttonText="Logout" onLogoutSuccess={this.responseGoogleLogout} cookiePolicy="single_host_origin" />
      </div>
    );
  }

  makeMenuLink(menu, index) {
    return (
      <div key={index} className="menu-item">
        <Link to={menu.link} className="nav-link" onClick={this.close}>
          <i className={`${menu.iconClass}`} />
        &nbsp;
          <span className="nav-item">{menu.name}</span>
        </Link>
      </div>
    );
  }

  navLinks() {
    return (
      <div className="nav-list">
        <p style={{ fontSize: '1px', marginBottom: '2px' }} />
        <div className="menu-item" style={{ backgroundColor: '#244a8bff' }}>
          <p style={{ color: '#fff', marginBottom: '2px' }}>
            <a href="http://bit.ly/CollegeLutheranDirections" className="menu-hover" style={{ color: '#88c1ff' }}>
              <span>210 S. College Ave</span>
            </a>
            <br />
              Salem, VA 24153
          </p>
        </div>
        <div className="menu-item" style={{ backgroundColor: '#244a8bff' }}>
          <p style={{ color: '#fff', marginBottom: '2px' }}>
            <span>ph: </span>
            <a href="tel:5403894963" className="menu-hover" style={{ color: '#88c1ff' }}>(540) 389-4963</a>
            <br />
            <span>fax: </span>
            <a href="tel:5403894980" className="menu-hover" style={{ color: '#88c1ff' }}>(540) 389-4980</a>
            <br />
            <a style={{ color: '#88c1ff', wordWrap: 'break-word' }} href="mailto:office1@collegelutheran.org">
              <span className="menu-hover">office1@collegelutheran.org</span>
            </a>
          </p>
        </div>
        {this.menus.map((menu, index) => (this.menuUtils.menuItem(menu, index, this)))}
      </div>
    );
  }

  headerSection() {
    return (
      <div id="header" className={`material-header ${this.currentStyles.headerClass}`}>
        <div className="headercontent" />
        <div>
          <div style={{ marginLeft: '5px', marginTop: '-18px' }}>
            <div className="flex-header">
              <h2 className="header-text" style={{ marginBottom: '0px', marginTop: '1px', fontSize: '34px' }}>
                <a className="header-text" href="/" style={{ textAlign: 'left', textDecoration: 'none' }}>College Lutheran Church</a>
              </h2>
              <p className="subTitle" style={{ marginTop: '-6px', maxWidth: '100%' }}>
                We celebrate God&apos;s grace and share His love in Christ!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { menuOpen } = this.state;
    const style = `${this.currentStyles.sidebarClass} ${menuOpen ? 'open' : 'close'}`;

    return (
      <div className="page-host">
        <div tabIndex={0} role="button" id="sidebar" onClick={this.close} onKeyPress={this.handleKeyPress} className={`${style} drawer-container`}>
          <div className="drawer" style={{ backgroundColor: '#c0c0c0' }}>
            <div className="navImage">
              <img alt="Luther Rose" id="webjamwidelogo" src={`${this.currentStyles.sidebarImagePath}`} style={{ marginRight: 0, width: '86px' }} />
            </div>
            { this.navLinks() }
          </div>
        </div>
        <div className="main-panel">
          <span onClick={this.toggleMobileMenu} onKeyPress={this.handleKeyMenu} id="mobilemenutoggle" tabIndex={0} role="button">
            <i className="fas fa-bars" />
          </span>
          <div className="mainPanel">
            <div className="swipe-area" />
            {this.headerSection()}
            <div style={{ width: 'auto' }} id="contentBlock" className="content-block">
              { this.children }
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/* istanbul ignore next */
AppTemplate.defaultProps = {
  dispatch: () => {}, auth: { isAuthenticated: false, user: { userType: '' } },
};

AppTemplate.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({ userType: PropTypes.string }),
  }),
  dispatch: PropTypes.func,
  children: PropTypes.element.isRequired,
};
export default withRouter(connect(mapStoreToProps, null)(AppTemplate));
