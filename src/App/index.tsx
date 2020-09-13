import 'core-js/stable';
import 'regenerator-runtime/runtime';
import superagent from 'superagent';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import commonUtils from '../lib/commonUtils';
import DefaultMusic from '../containers/Music';
import Beliefs from '../containers/Beliefs';
import DefaultFamily from '../containers/Family';
import Giving from '../containers/Giving';
import Staff from '../containers/Staff';
import DefaultYouth from '../containers/Youth';
import AdminDashboardDefault from '../containers/AdminDashboard';
import DefaultNews from '../containers/News';
import Calendar from '../containers/Calendar';
import AppFourOhFour from './404';
import AppTemplateDefault from './AppTemplate';
import DefaultHome from '../containers/Homepage';
import mapStoreToProps from '../redux/mapStoreToProps';
import fetch from '../lib/fetch';
import { AppProps } from './AppTypes';

export class App extends Component<AppProps> {
  fetch: typeof fetch;

  superagent: superagent.SuperAgentStatic;

  static defaultProps = {
    dispatch: /* istanbul ignore next */(): void => { },
    auth: {
      isAuthenticated: false,
      user: { userType: '' },
      error: '',
      email: '',
      token: '',
    },
  };

  constructor(props: AppProps) {
    super(props);
    this.fetch = fetch;
    this.state = {};
    this.superagent = superagent;
  }

  componentDidMount(): void { // fetch the books to populate homepage content, youth pics, music pics and children pics
    this.fetch.fetchGet(this, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
    this.fetch.fetchGet(this, 'book?type=familyPics', 'GOT_FAMILYPICS');
    this.fetch.fetchGet(this, 'book?type=Forum', 'GOT_BOOKS');
    this.fetch.fetchGet(this, 'book?type=youthPics', 'GOT_YOUTHPICS');
    this.fetch.fetchGet(this, 'book?type=otherPics', 'GOT_OTHERPICS');
    this.fetch.fetchGet(this, 'book?type=musicPics', 'GOT_MUSICPICS');
  }

  render(): JSX.Element {
    const { auth } = this.props;
    const userRoles: string[] = commonUtils.getUserRoles();
    return (
      <div id="App" className="App">
        <Router>
          <AppTemplateDefault>
            <Switch>
              <Route exact path="/" component={DefaultHome} />
              <Route path="/music" component={DefaultMusic} />
              <Route path="/belief" component={Beliefs} />
              <Route path="/family" component={DefaultFamily} />
              <Route path="/giving" component={Giving} />
              <Route exact path="/staff" component={Staff} />
              {auth.isAuthenticated && auth.user.userType && userRoles.indexOf(auth.user.userType) !== -1
                ? <Route path="/admin" component={AdminDashboardDefault} /> : null}
              <Route path="/youth" component={DefaultYouth} />
              <Route path="/news" component={DefaultNews} />
              <Route path="/calendar" component={Calendar} />
              <Route component={AppFourOhFour} />
            </Switch>
          </AppTemplateDefault>
        </Router>
      </div>

    );
  }
}

export default connect(mapStoreToProps, null)(App);
