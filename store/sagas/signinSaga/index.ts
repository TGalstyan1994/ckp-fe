import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios from 'axios'
import { Action } from 'store'
import { endStageFetching, setFetchingErrors } from 'store/reducers/signin'

function* LoginUser(action: Action) {
  try {
    yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API}/api/auth/login`,
      action.payload
    )
    yield put(endStageFetching())
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(endStageFetching())
  }
}

export function* handleLoginSaga(): Generator {
  yield takeEvery('LOGIN_USER', LoginUser)
}
