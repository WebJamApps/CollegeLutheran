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

export interface AppProps {
  dispatch: (...args: any[]) => any;
  auth: {
    user: {
      userType?: string;
    };
    isAuthenticated?: boolean;
  };
}
export class App extends Component<AppProps> {
  fetch: any;

  superagent: any;

  static defaultProps = {
    dispatch: /* istanbul ignore next */() => { },
    auth: { isAuthenticated: false, user: { userType: '' } },
  };

  constructor(props: any) {
    super(props);
    this.fetch = fetch;
    this.state = {};
    this.superagent = superagent;
  }

  componentDidMount() { // fetch the books to populate homepage content, youth pics, and children pics
    this.fetch.fetchGet(this, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
    this.fetch.fetchGet(this, 'book?type=familyPics', 'GOT_FAMILYPICS');
    this.fetch.fetchGet(this, 'book?type=Forum', 'GOT_BOOKS');
    this.fetch.fetchGet(this, 'book?type=youthPics', 'GOT_YOUTHPICS');
    this.fetch.fetchGet(this, 'book?type=otherPics', 'GOT_OTHERPICS');
  }

  render() {
    const { auth } = this.props;
    const userRoles: any[] = commonUtils.getUserRoles();
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
              {auth.isAuthenticated && userRoles.indexOf(auth.user.userType) !== -1
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
