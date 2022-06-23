import axios from 'axios';
import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailure,
} from './MovieActions';

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());

  try {
    const res = await axios.get(`http://localhost:8800/api/v1/movies/`, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(getMoviesSuccess(res.data.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());

  try {
    const res = await axios.post(`http://localhost:8800/api/v1/movies/`, movie, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(createMovieSuccess(res.data.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

export const updateMovie = async (movie, id, dispatch) => {
  dispatch(updateMovieStart());

  try {
    const res = await axios.patch(`http://localhost:8800/api/v1/movies/${id}`, movie, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,

        'Content-Type': 'application/json',
      },
    });

    dispatch(updateMovieSuccess(res.data.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());

  try {
    await axios.delete(`http://localhost:8800/api/v1/movies/${id}`, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};
