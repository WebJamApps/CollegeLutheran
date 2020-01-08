import PropTypes from 'prop-types';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import superagent from 'superagent';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultMusic from '../containers/Music';
import Beliefs from '../containers/Beliefs';
import Family from '../containers/Family';
import Giving from '../containers/Giving';
import Staff from '../containers/Staff';
import Youth from '../containers/Youth';
import News from '../containers/News';
import Calendar from '../containers/Calendar';
import AppFourOhFour from './404';
import AppTemplateDefault from './AppTemplate';
import DefaultHome from '../containers/Homepage';
import mapStoreToProps from '../redux/mapStoreToProps';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.superagent = superagent;
    this.fetchHomepage = this.fetchHomepage.bind(this);
  }

  componentDidMount() { // fetch the books to populate homepage content, youth pics, and children pics
    this.fetchHomepage();
  }

  async fetchHomepage() {
    let res;
    const { dispatch } = this.props;
    try { res = await this.superagent.get(`${process.env.BackendUrl}/book/one?type=homePageContent`).set('Accept', 'application/json'); } catch (e) {
      return Promise.resolve(false);
    }
    dispatch({ type: 'GOT_HOMEPAGE', data: res.body });
    return Promise.resolve(true);
  }

  render() {
    return (
      <div id="App" className="App">
        <Router>
          <AppTemplateDefault id="homepage">
            <Switch>
              <Route exact path="/" component={DefaultHome} />
              <Route path="/music" component={DefaultMusic} />
              <Route path="/belief" component={Beliefs} />
              <Route path="/family" component={Family} />
              <Route path="/giving" component={Giving} />
              <Route path="/staff" component={Staff} />
              <Route path="/youth" component={Youth} />
              <Route path="/news" component={News} />
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
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({ userType: PropTypes.string }),
  }),
};
App.defaultProps = { auth: { isAuthenticated: false, user: { userType: '' } } };

export default connect(mapStoreToProps, null)(App);
