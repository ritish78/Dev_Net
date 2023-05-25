import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import Dashboard from './component/layout/dashboard/Dashboard';
import PrivateRoute from './component/routing/PrivateRoute';
import CreateProfile from './component/layout/profile/CreateProfile';

import { useEffect } from 'react';
import { loadUser } from './actions/auth';

//Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { LOGOUT } from './actions/constant';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    } 
    // else {
    //   store.dispatch({ type: LOGOUT });
    // }
  }, []);

  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <Alert />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route 
                  path='/dashboard' 
                  element={<PrivateRoute component={Dashboard} />}
              />
              <Route 
                  path='/create-profile' 
                  element={<PrivateRoute component={CreateProfile} />}
              />
            </Routes>
      </Router>
    </Provider>
  );
}



export default App;
