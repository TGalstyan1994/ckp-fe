import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios from 'axios'
import {
  endFetching,
  setFetchingErrors,
  stopFetching,
} from 'src/store/reducers/forgotpassword'
import { ResponseGenerator } from 'src/interfaces/saga/saga'
import { Action } from 'src/store/index'

const ChangePassword = async (data: any) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API}/api/password-recovery/request`,
    data
  )
}

function* ChangeUserPassword(action: Action) {
  try {
    const res: ResponseGenerator = yield call(ChangePassword, action.payload)
    return

    yield put(endFetching(res.data))
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(stopFetching())
  }
}

export function* handleChangePasswordSaga(): Generator {
  yield takeEvery('GET_PASSWORD_FROM_EMAIL', ChangeUserPassword)
}
