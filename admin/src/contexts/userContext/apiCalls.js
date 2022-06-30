import axios from 'axios';
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from './UserActions';

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());

  try {
    const res = await axios.get(`http://localhost:8800/api/v1/users`, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(getUsersSuccess(res.data.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// export const createList = async (list, dispatch) => {
//   dispatch(createListStart());

//   try {
//     const res = await axios.post(`http://localhost:8800/api/v1/lists/`, list, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     dispatch(createListSuccess(res.data.data));
//   } catch (err) {
//     dispatch(createListFailure());
//   }
// };

// export const updateMovie = async (movie, id, dispatch) => {
//   dispatch(updateMovieStart());

//   try {
//     const res = await axios.patch(`http://localhost:8800/api/v1/movies/${id}`, movie, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     dispatch(updateMovieSuccess(res.data.data));
//   } catch (err) {
//     dispatch(updateMovieFailure());
//   }
// };

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());

  try {
    await axios.delete(`http://localhost:8800/api/v1/users/${id}`, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
