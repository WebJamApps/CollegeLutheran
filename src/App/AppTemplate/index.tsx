/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Dispatch } from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { connect } from 'react-redux';
import type { Ibook } from 'src/redux/mapStoreToProps';
import { DrawerContainer } from './DrawerContainer';
import { MainPanel } from './MainPanel';

interface IappTemplateState { menuOpen: boolean }

export class AppTemplate extends React.Component<any, IappTemplateState> {
  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false, user: { userType: '' }, email: '', error: '', token: '',
    },
  };

  constructor(props:any) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.handleKeyMenu = this.handleKeyMenu.bind(this);
  }

  handleKeyMenu(e: { key: string; }): (void | null) {
    if (e.key === 'Enter') return this.toggleMobileMenu();
    return null;
  }

  toggleMobileMenu(): void {
    const { menuOpen } = this.state;
    const mO = !menuOpen;
    this.setState({ menuOpen: mO });
  }

  render(): JSX.Element {
    const {
      children,
      // location,
      books, dispatch,
    } = this.props;
    const auth = { isAuthenticated: false };// TODO make this a react functional component with useContext hook
    const location = { pathname: '/' };// TODO make this a react functional component with useLocation hook
    return (
      <div className="page-host">
        <DrawerContainer
          location={location}
          auth={auth}
          books={books}
          dispatch={dispatch}
          menuOpen={this.state.menuOpen}
          setMenuOpen={(bool: boolean) => this.setState({ menuOpen: bool })}
        />
        <MainPanel children={children} toggleMobileMenu={this.toggleMobileMenu} handleKeyMenu={this.handleKeyMenu} />
      </div>
    );
  }
}

// export default connect(mapStoreToProps, null)(AppTemplate as any);
