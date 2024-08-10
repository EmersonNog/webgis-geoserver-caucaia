import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {' '}
              <Home />{' '}
            </>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <>
              {' '}
              <Login />{' '}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default Rotas;
