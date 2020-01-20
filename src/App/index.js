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

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.superagent = superagent;
    this.fetchHomepage = this.fetchHomepage.bind(this);
    this.fetchFamily = this.fetchFamily.bind(this);
    this.fetchYouth = this.fetchYouth.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  componentDidMount() { // fetch the books to populate homepage content, youth pics, and children pics
    this.fetchHomepage();
    this.fetchFamily();
    this.fetchYouth();
    this.fetchBooks();
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

  async fetchFamily() {
    let fres;
    const { dispatch } = this.props;
    try { fres = await this.superagent.get(`${process.env.BackendUrl}/book?type=familyPics`).set('Accept', 'application/json'); } catch (e) {
      console.log(e.message);// eslint-disable-line no-console
      return Promise.resolve(false);
    }
    dispatch({ type: 'GOT_FAMILYPICS', data: fres.body });
    return Promise.resolve(true);
  }

  async fetchYouth() {
    let fres;
    const { dispatch } = this.props;
    try { fres = await this.superagent.get(`${process.env.BackendUrl}/book?type=youthPics`).set('Accept', 'application/json'); } catch (e) {
      console.log(e.message);// eslint-disable-line no-console
      return Promise.resolve(false);
    }
    dispatch({ type: 'GOT_YOUTHPICS', data: fres.body });

  /* Fetches books for newsContent */
  async fetchBooks() {
    let bres;
    const { dispatch } = this.props;
    try { bres = await this.superagent.get(`${process.env.BackendUrl}/book`).set('Accept', 'application/json'); } catch (e) {
      console.log(e.message);// eslint-disable-line no-console
      return Promise.resolve(false);
    }
    dispatch({ type: 'GOT_BOOKS', data: bres.body });
    return Promise.resolve(true);
  }

  render() {
    const { auth } = this.props;
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
              {auth.isAuthenticated && auth.user.userType === 'Developer'
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
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({ user: PropTypes.shape({ userType: PropTypes.string }), isAuthenticated: PropTypes.bool }),
};
App.defaultProps = { auth: { isAuthenticated: false, user: { userType: '' } } };

export default connect(mapStoreToProps, null)(App);
