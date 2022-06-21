import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './contexts/authContext/AuthContext';
import { MovieContextProvider } from './contexts/movieContext/MovieContext';

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);
