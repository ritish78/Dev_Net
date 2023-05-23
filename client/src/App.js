import './App.css';
import Navbar from './component/Navbar';
import Landing from './component/Landing';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
        </Routes>
      </>
    </Router>
  );
}



export default App;
