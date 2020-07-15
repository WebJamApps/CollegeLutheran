import React, { Dispatch } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  GoogleLogin, GoogleLogout, GoogleLoginResponseOffline, GoogleLoginResponse,
} from 'react-google-login';
import { connect } from 'react-redux';
import authUtils from './authUtils';
import mapStoreToProps, { Auth } from '../redux/mapStoreToProps';
import Footer from './Footer';
import menuUtils from './menuUtils';
import menuItems, { MenuItem } from './menuItems';

interface AppMainProps extends RouteComponentProps {
  children: React.ReactNode;
  auth: Auth;
  dispatch: Dispatch<unknown>;
}

interface CurrentStyles {
  headerClass: string,
  sidebarClass: string,
  sidebarImagePath: string
}

interface AppMainState { menuOpen: boolean }
export class AppTemplate extends React.Component<AppMainProps, AppMainState> {
  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false, user: { userType: '' }, email: '', error: '', token: '',
    },
  };

  menuUtils: typeof menuUtils;

  authUtils: typeof authUtils;

  menus: MenuItem[];

  constructor(props: AppMainProps) {
    super(props);
    this.menus = menuItems;
    this.menuUtils = menuUtils;
    this.state = { menuOpen: false };
    this.close = this.close.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyMenu = this.handleKeyMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.navLinks = this.navLinks.bind(this);
    this.responseGoogleLogin = this.responseGoogleLogin.bind(this);
    this.responseGoogleLogout = this.responseGoogleLogout.bind(this);
    this.googleButtons = this.googleButtons.bind(this);
    this.authUtils = authUtils;
  }

  get currentStyles(): CurrentStyles { // eslint-disable-line class-methods-use-this
    const result = {
      headerClass: 'home-header',
      sidebarClass: 'home-sidebar',
      sidebarImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Lutherrose.svg/800px-Lutherrose.svg.png',
    };
    return result;
  }

  toggleMobileMenu(): void {
    const { menuOpen } = this.state;
    const mO = !menuOpen;
    this.setState({ menuOpen: mO });
  }

  responseGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse): Promise<string> {
    return this.authUtils.responseGoogleLogin(response, this);
  }

  responseGoogleLogout(): string { const { dispatch } = this.props; return this.authUtils.responseGoogleLogout(dispatch); }

  close(): boolean {
    this.setState({ menuOpen: false });
    return true;
  }

  handleKeyPress(e: { key: string; }): (void | null) {
    if (e.key === 'Escape') return this.setState({ menuOpen: false });
    return null;
  }

  handleKeyMenu(e: { key: string; }): (void | null) {
    if (e.key === 'Enter') return this.toggleMobileMenu();
    return null;
  }

  googleButtons(type: string, index: string | number | undefined): JSX.Element {
    const cId = process.env.GoogleClientId || /* istanbul ignore next */'';
    if (type === 'login') {
      return (
        <div key={index} className="menu-item googleLogin">
          <GoogleLogin
            responseType="code"
            clientId={cId}
            buttonText="Login"
            accessType="offline"
            onSuccess={this.responseGoogleLogin}
            onFailure={this.authUtils.responseGoogleFailLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
      );
    } return (
      <div key={index} className="menu-item googleLogout">
        <GoogleLogout clientId={cId} buttonText="Logout" onLogoutSuccess={this.responseGoogleLogout} />
      </div>
    );
  }

  makeMenuLink(menu: MenuItem, index: number): JSX.Element {
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

  navLinks(): JSX.Element {
    return (
      <div className="nav-list" style={{ width: '220px' }}>
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

  headerSection(): JSX.Element {
    return (
      <div id="header" className={`material-header ${this.currentStyles.headerClass}`}>
        <div className="headercontent" />
        <div>
          <div style={{ marginLeft: '5px', marginTop: '-18px' }}>
            <div className="flex-header">
              <h2 className="header-text" style={{ marginBottom: '0px', marginTop: '1px', fontSize: '34px' }}>
                <a className="header-text" href="/" style={{ textAlign: 'left', textDecoration: 'none' }}>College Lutheran Church</a>
              </h2>
              <p className="subTitle" style={{ maxWidth: '100%' }}>
                We celebrate God&apos;s grace and share His love in Christ!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  drawerContainer(className: string): JSX.Element {
    return (
      <div tabIndex={0} role="button" id="sidebar" onClick={this.close} onKeyPress={this.handleKeyPress} className={`${className} drawer-container`}>
        <div
          className="drawer"
          style={{
            backgroundColor: '#c0c0c0', zIndex: -1, position: 'relative',
          }}
        >
          <div className="navImage" style={{ width: '220px' }}>
            <img
              alt="Luther Rose"
              id="webjamwidelogo"
              src={`${this.currentStyles.sidebarImagePath}`}
              style={{ width: '86px', marginRight: 0, marginLeft: 0 }}
            />
          </div>
          {this.navLinks()}
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const { children } = this.props;
    const { menuOpen } = this.state;
    const style = `${this.currentStyles.sidebarClass} ${menuOpen ? 'open' : 'close'}`;
    return (
      <div className="page-host">
        {this.drawerContainer(style)}
        <div className="main-panel">
          <span onClick={this.toggleMobileMenu} onKeyPress={this.handleKeyMenu} id="mobilemenutoggle" tabIndex={0} role="button">
            <i className="fas fa-bars" />
          </span>
          <div className="mainPanel">
            <div className="swipe-area" />
            {this.headerSection()}
            <div style={{ width: 'auto' }} id="contentBlock" className="content-block">
              {children}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AppTemplate));
