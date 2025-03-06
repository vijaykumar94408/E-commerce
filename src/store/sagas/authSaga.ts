import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure, LoginRequestAction } from '../actions/authActions';

function* loginSaga(
  action: LoginRequestAction
): Generator<unknown, void, { data: { token: string; user: { id: number; username: string; email: string } } }> {
  try {
    const res = yield call(axios.post, 'http://localhost:5000/api/auth/login', action.payload);
    localStorage.setItem('token', res.data.token);
    yield put(loginSuccess(res.data));
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    yield put(loginFailure(axiosError.response?.data?.message || 'Login failed'));
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
