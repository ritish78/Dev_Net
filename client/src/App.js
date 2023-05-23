import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';

//Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <Alert />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
      </Router>
    </Provider>
  );
}



export default App;
