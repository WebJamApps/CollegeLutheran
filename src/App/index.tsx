import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { AuthContext, Iauth } from 'src/providers/Auth.provider';
import DefaultMusic from '../containers/Music';
import { Beliefs } from '../containers/Beliefs';
import { Giving } from '../containers/Giving';
import Staff from '../containers/Staff';
import DefaultYouth from '../containers/Youth';
import AdminDashboardDefault from '../containers/AdminDashboard';
import DefaultNews from '../containers/News';
import { Family } from '../containers/Family';
import Calendar from '../containers/Calendar';
import { AppTemplate } from './AppTemplate';
import DefaultHome from '../containers/Homepage';
// import Stewardship from '../containers/Stewardship';
import DefaultLiveStream from '../containers/LiveStream';
import HabitatProject from '../containers/HabitatProject';

export function checkIsAdmin(auth: Iauth, setIsAdmin: (arg0: boolean) => void) {
  let isAdmin = false;
  if (auth && auth.isAuthenticated && process.env.userRoles) {
    const { user: { userType } } = auth;
    const rolesJSON = JSON.parse(process.env.userRoles);
    const { roles } = rolesJSON;
    if (userType && roles.includes(userType)) isAdmin = true;
  }
  setIsAdmin(isAdmin);
}

export function App(): JSX.Element {
  const { auth } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => checkIsAdmin(auth, setIsAdmin), [auth]);
  return (
    <div id="App" className="App">
      <ReactNotifications />
      <BrowserRouter>
        <AppTemplate>
          <Routes>
            <Route path="/" element={<DefaultHome />} />
            <Route path="/music" element={<DefaultMusic />} />
            <Route path="/belief" element={<Beliefs />} />
            <Route path="/family" element={<Family />} />
            <Route path="/giving" element={<Giving />} />
            <Route path="/onlinegiving" element={<Navigate to="/giving" replace />} />
            <Route path="/staff" element={<Staff />} />
            {isAdmin
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
