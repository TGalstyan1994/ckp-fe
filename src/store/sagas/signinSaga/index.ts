import { call, takeEvery, put } from '@redux-saga/core/effects';
import axios from 'axios';
import { Action } from '../../index';
import { endStageFetching, setFetchingErrors, stopFetching } from 'src/store/reducers/signin';
import { ResponseGenerator } from '../../../interfaces/saga/saga';

const LogIn = async (data: any) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, data);
};

function* LoginUser(action: Action) {
  try {
    const res: ResponseGenerator = yield call(LogIn, action.payload);
    yield put(endStageFetching(res.data));
  } catch (error) {
    yield put(setFetchingErrors(error));
    yield put(stopFetching());
  }
}

export function* handleLoginSaga(): Generator {
  yield takeEvery('LOGIN_USER', LoginUser);
}
