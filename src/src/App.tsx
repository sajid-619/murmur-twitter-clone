import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { useRecoilState } from 'recoil';

import './App.css';

import Layout from "./container/Layout/Layout";
import Login from './container/Auth/Login';
import Signup from './container/Auth/Signup';
import Timeline from './container/Timeline/Timeline';
import Users from './container/Users/UsersList';
import MurmursDetails from './container/Murmursdetails/MurmursDetails';
import UsersDetails from './container/UserDetails/UserDetails';
import Profile from './container/Profile/Profile';




import { loggedInState } from "./atoms/user";

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, ] = useRecoilState(loggedInState);

 useEffect(() => {
  if(!isLoggedIn) {
    navigate('/');
  } else {
    const pathname: string = location.pathname === "/" ? "/timeline" : location.pathname;
    navigate(pathname);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="App">
      <Layout>
        {
          !isLoggedIn ? 
            <Routes>
              <Route path="/signup"  element={<Signup />}/>
              <Route path="/" element={<Login />}/>   
            </Routes>
          : <Routes>
            <Route path="/timeline"  element={<Timeline />}/>
            <Route path="/users"  element={<Users />}/>
            <Route path="/profile"  element={<Profile />}/>
            <Route path="/user_details/:userId"  element={<UsersDetails />}/>
            <Route path="/details/:murmurId"  element={<MurmursDetails />}/>

          </Routes>
        }
      </Layout>
    </div>
  );
}

export default App;
