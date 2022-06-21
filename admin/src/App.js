import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import { AuthContext } from './contexts/authContext/AuthContext';
import { useContext } from 'react';
import NewUser from './pages/newUser/NewUser';
import MovieList from './pages/movieList/MovieList';
import Movie from './pages/movie/Movie';
import NewMovie from './pages/newMovie/NewMovie';
import ListList from './pages/listList/ListList';
import Login from './pages/login/login';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
          <Login />
        </Route>
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <MovieList />
              </Route>
              <Route path="/movie/:movieId">
                <Movie />
              </Route>
              <Route path="/newmovie">
                <NewMovie />
              </Route>
              <Route path="/lists">
                <ListList />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
