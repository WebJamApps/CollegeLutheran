import React, { Dispatch } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps, { Auth, Ibook } from '../../redux/mapStoreToProps';
import { DrawerContainer } from './DrawerContainer';
import { MainPanel } from './MainPanel';

export interface IappTemplateProps extends RouteComponentProps {
  children: React.ReactNode;
  auth: Auth;
  dispatch: Dispatch<unknown>;
  books?: Ibook[] | []
}

interface IappTemplateState { menuOpen: boolean }

export class AppTemplate extends React.Component<IappTemplateProps, IappTemplateState> {
  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false, user: { userType: '' }, email: '', error: '', token: '',
    },
  };

  constructor(props: IappTemplateProps) {
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
    console.log('toggleMobileMenu');
    const { menuOpen } = this.state;
    const mO = !menuOpen;
    this.setState({ menuOpen: mO });
  }

  render(): JSX.Element {
    const { children, location, auth, books, dispatch } = this.props;
    return (
      <div className="page-host">
        <DrawerContainer
          location={location} auth={auth} books={books} dispatch={dispatch}
          menuOpen={this.state.menuOpen} setMenuOpen={(bool: boolean) => this.setState({ menuOpen: bool })}
        />
        <MainPanel children={children} toggleMobileMenu={this.toggleMobileMenu} handleKeyMenu={this.handleKeyMenu} />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AppTemplate));
