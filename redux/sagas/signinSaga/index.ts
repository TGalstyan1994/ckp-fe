import { call, CallEffect, takeEvery, put } from '@redux-saga/core/effects'
import axios from 'axios'
import { Action } from 'redux'

function* LoginUser(action: Action) {
  try {
    const user: CallEffect = yield call(
      axios.post,
      'https://be.ckp.rocketech.net/api/auth/login',
      action.payload
    )
    yield put({ type: 'USER_FETCH_SUCCEEDED', payload: { user } })
  } catch ({ message }) {
    yield put({ type: 'USER_FETCH_FAILED', payload: { message } })
  }
}

export function* handleLoginSaga() {
  yield takeEvery('LOGIN_USER', LoginUser)
}
