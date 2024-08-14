import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import About from '../Pages/About/About';
import PrivateRoute from '../Services/PrivateRoute';
import Cadaster from '../Pages/Cadaster/Cadaster';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/map" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/map" replace />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/cadaster"
          element={
            <PrivateRoute>
              <Cadaster />
            </PrivateRoute>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
