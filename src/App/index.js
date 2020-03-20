import PropTypes from 'prop-types';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import superagent from 'superagent';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
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
import fetch from './fetch';

export class App extends Component {
  constructor(props) {
    super(props);
    this.fetch = fetch;
    this.state = {};
    this.superagent = superagent;
  }

  componentDidMount() { // fetch the books to populate homepage content, youth pics, and children pics
    this.fetch(this, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
    this.fetch(this, 'book?type=familyPics', 'GOT_FAMILYPICS');
    this.fetch(this, 'book?type=Forum', 'GOT_BOOKS');
    this.fetch(this, 'book?type=youthPics', 'GOT_YOUTHPICS');
    this.fetch(this, 'book?type=otherPics', 'GOT_OTHERPICS');
  }

  render() {
    const { auth } = this.props;
    const userRoles = JSON.parse(process.env.userRoles).roles;
    return (
      <div id="App" className="App">
        <Router>
          <AppTemplateDefault id="homepage">
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
App.propTypes = {
  auth: PropTypes.shape({ user: PropTypes.shape({ userType: PropTypes.string }), isAuthenticated: PropTypes.bool }),
};
App.defaultProps = { auth: { isAuthenticated: false, user: { userType: '' } } };

export default connect(mapStoreToProps, null)(App);
