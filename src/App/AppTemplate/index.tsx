import React, { Dispatch } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps, { Auth, Ibook } from '../../redux/mapStoreToProps';
import Footer from '../Footer';
import { DrawerContainer } from './DrawerContainer';

export interface IappTemplateProps extends RouteComponentProps {
  children: React.ReactNode;
  auth: Auth;
  dispatch: Dispatch<unknown>;
  books?: Ibook[] | []
}

interface CurrentStyles {
  headerClass: string,
  sidebarClass: string,
  sidebarImagePath: string
}

interface AppMainState { menuOpen: boolean }

export class AppTemplate extends React.Component<IappTemplateProps, AppMainState> {
  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false, user: { userType: '' }, email: '', error: '', token: '',
    },
  };

  constructor(props: IappTemplateProps) {
    super(props);
    this.handleKeyMenu = this.handleKeyMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.state = { menuOpen:false };
  }

  handleKeyMenu(e: { key: string; }): (void | null) {
    if (e.key === 'Enter') return this.toggleMobileMenu();
    return null;
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

  headerSection(): JSX.Element {
    return (
      <div id="header" className={`material-header ${this.currentStyles.headerClass}`} style={{ backgroundColor: '#244a8bff' }}>
        <div className="headercontent" />
        <div>
          <div className="flex-header" style={{ marginLeft: '5px', marginTop: '-18px' }}>
            <h2 className="header-text" style={{ marginBottom: '0px', marginTop: '1px', fontSize: '34px' }}>
              <a className="header-text" href="/" style={{ textAlign: 'left', textDecoration: 'none' }}>College Lutheran Church</a>
            </h2>
            <p className="subTitle" style={{ maxWidth: '100%', color:'#f4c00eff' }}>
              We celebrate God&apos;s grace and share His love in Christ!
            </p>
          </div>
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const { children, location, auth, books, dispatch } = this.props;
    return (
      <div className="page-host">
        <DrawerContainer location={ location } auth={ auth } books={ books } dispatch={ dispatch }/>
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
