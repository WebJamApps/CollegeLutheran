import PropTypes from 'prop-types';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultMusic from '../containers/Music';
import DefaultMusicDashboard from '../containers/MusicDashboard';
import BuyMusic from '../containers/BuyMusic';
import News from '../containers/News';
import Calendar from '../containers/Calendar';
import AppFourOhFour from './404';
import AppMain from './app-main';
import HomePage from '../containers/Homepage';
import mapStoreToProps from '../redux/mapStoreToProps';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { // fetch the books to populate homepage content, youth pics, and children pics

  }

  render() {
    const { auth } = this.props;
    // console.log(auth);//eslint-disable-line
    return (
      <div id="App" className="App">
        <Router>
          <AppMain id="homepage">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/music" component={DefaultMusic} />
              <Route path="/music/buymusic" component={BuyMusic} />
              {auth.isAuthenticated && auth.user.userType === 'Developer'
                ? <Route path="/music/dashboard" component={DefaultMusicDashboard} /> : null}
              <Route path="/news" component={News} />
              <Route path="/calendar" component={Calendar} />
              <Route component={AppFourOhFour} />
            </Switch>
          </AppMain>
        </Router>
      </div>

    );
  }
}
App.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // songs: PropTypes.arrayOf(PropTypes.shape({})),
  // images: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({})]),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({ userType: PropTypes.string }),
  }),
};
App.defaultProps = { auth: { isAuthenticated: false, user: { userType: '' } } };

export default connect(mapStoreToProps, null)(App);
