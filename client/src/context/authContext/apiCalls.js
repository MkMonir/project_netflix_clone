import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from './AuthActions';

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(`http://localhost:8800/api/v1/auth/login`, user, {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
