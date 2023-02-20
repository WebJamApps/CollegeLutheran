// import superagent from 'superagent';
// import { Component } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
// import { connect } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component';
import commonUtils from '../lib/commonUtils';
import DefaultMusic from '../containers/Music';
import Beliefs from '../containers/Beliefs';
import DefaultFamily from '../containers/Family';
import { Giving } from '../containers/Giving';
import Staff from '../containers/Staff';
import DefaultYouth from '../containers/Youth';
import AdminDashboardDefault from '../containers/AdminDashboard';
import DefaultNews from '../containers/News';
import Calendar from '../containers/Calendar';
// import AppFourOhFour from './404';
import { AppTemplate } from './AppTemplate';
import DefaultHome from '../containers/Homepage';
// import Stewardship from '../containers/Stewardship';
import DefaultLiveStream from '../containers/LiveStream';
// import mapStoreToProps, { Iauth } from '../redux/mapStoreToProps';
// import fetch from '../lib/fetch';
import HabitatProject from '../containers/HabitatProject';

// export class App extends Component<AppProps> {
//   fetch: typeof fetch;

//   superagent: superagent.SuperAgentStatic;

//   static defaultProps = {
//     dispatch: /* istanbul ignore next */(): void => { },
//   };

// constructor(props: AppProps) {
//   super(props);
//   this.fetch = fetch;
//   this.state = {};
//   this.superagent = superagent;
// }

// componentDidMount(): void { // fetch the books to populate homepage content, youth pics, music pics and children pics
//   this.fetch.fetchGet(this, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
//   this.fetch.fetchGet(this, 'book/one?type=youthPageContent', 'GOT_YOUTHPAGE');
//   this.fetch.fetchGet(this, 'book?type=Forum', 'GOT_BOOKS');// news page
// }

export function App(): JSX.Element {
  const auth = { isAuthenticated: false, user: { userType: 'Developer' } };
  // const { auth } = this.props;
  const userRoles: string[] = commonUtils.getUserRoles();
  // console.log(auth);
  return (
    <div id="App" className="App">
      <ReactNotifications />
      <BrowserRouter>
        <AppTemplate>
          <Routes>
            <Route path="/" element={<DefaultHome />} />
            <Route path="/music" element={<DefaultMusic />} />
            <Route path="/belief" element={<Beliefs />} />
            <Route path="/family" element={<DefaultFamily />} />
            <Route path="/giving" element={<Giving />} />
            <Route path="/onlinegiving" element={<Navigate to="/giving" replace />} />
            <Route path="/staff" element={<Staff />} />
            {auth.isAuthenticated && auth.user.userType && userRoles.indexOf(auth.user.userType) !== -1
              ? <Route path="/admin" element={<AdminDashboardDefault />} /> : null}
            <Route path="/youth" element={<DefaultYouth />} />
            <Route path="/news" element={<DefaultNews />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route path="/stewardship" component={Stewardship} /> */}
            <Route path="/livestream" element={<DefaultLiveStream />} />
            <Route path="/habitatproject" element={<HabitatProject />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppTemplate>
      </BrowserRouter>
    </div>
  );
}

// export default connect(mapStoreToProps, null)(App as any);
