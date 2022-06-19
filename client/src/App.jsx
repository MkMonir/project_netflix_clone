import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './app.scss';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';

const App = () => {
  const user = true;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/register" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          {user && (
            <>
              <Route path="/movies" element={<Home type="movies" />} />
              <Route path="/series" element={<Home type="series" />} />
              <Route path="/watch" element={<Watch />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
