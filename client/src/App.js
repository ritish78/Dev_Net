import './App.css';
import Navbar from './component/Navbar';
import Landing from './component/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
    </Router>
  );
}



export default App;
