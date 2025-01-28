import react from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Patient from './Patient';
import Doctors from './Doctor';
import Staffs from './Staffs';
import Admin from './Admins';

function App() {
  return (
    <Router>
      <div>
        <h1>hospital Management System</h1>
        <div>
          <button>
            <Link to="/Doctor">Doctors</Link>
          </button>

          <button>
            <Link to="/Patient">Patient</Link>
          </button>

          <button>
            <Link to="/Staffs">Staffs</Link>
          </button>

          <button>
            <Link to="/Admins">Admin</Link>
          </button>
        </div>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Hospital Management System</h2>} />
          <Route path="/patient" element={<Patient />}></Route>
          <Route path='/Doctor' element={<Doctors />}></Route>
          <Route path='/Admins' element={<Admin />}></Route>
          <Route path='/Staffs' element={<Staffs />}></Route>
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;