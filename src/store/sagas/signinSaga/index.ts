import { call, takeEvery, put } from '@redux-saga/core/effects';
import axios from 'axios';
import { Action } from 'src/store/index';
import { endStageFetching, setFetchingErrors } from 'src/store/reducers/signin';

function* LoginUser(action: Action) {
  try {
    const res: any = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API}/api/auth/login`,
      action.payload
    );
    yield put(endStageFetching(res.data));
  } catch (error) {
    yield put(setFetchingErrors(error));
    yield put(endStageFetching());
  }
}

export function* handleLoginSaga(): Generator {
  yield takeEvery('LOGIN_USER', LoginUser);
}
