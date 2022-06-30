import axios from 'axios';
import {
  getListsStart,
  getListsSuccess,
  getListsFailure,
  deleteListStart,
  deleteListSuccess,
  deleteListFailure,
  createListStart,
  createListSuccess,
  createListFailure,
} from './ListActions';

export const getLists = async (dispatch) => {
  dispatch(getListsStart());

  try {
    const res = await axios.get(`http://localhost:8800/api/v1/lists/`, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(getListsSuccess(res.data.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());

  try {
    const res = await axios.post(`http://localhost:8800/api/v1/lists/`, list, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(createListSuccess(res.data.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

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

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());

  try {
    await axios.delete(`http://localhost:8800/api/v1/lists/${id}`, {
      headers: {
        token: JSON.parse(localStorage.getItem('user')).token,
        'Content-Type': 'application/json',
      },
    });

    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};
