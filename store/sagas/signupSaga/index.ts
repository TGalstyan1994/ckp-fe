import { takeEvery, put, call } from '@redux-saga/core/effects'
import axios from 'axios'
import { RegistrationAction } from 'store'
import {
  endStageFetching,
  finishStage,
  stageFetchingErrors,
} from 'store/reducers/signup'

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance
    captchaOnLoad: () => void
  }
}

function* completeStage(action: RegistrationAction) {
  const { payload, apiUrl } = action
  try {
    yield call(axios.post, `${process.env.NEXT_PUBLIC_API}${apiUrl}`, payload)
    yield put(stageFetchingErrors(''))
    yield put(finishStage())
    yield put(endStageFetching())
  } catch (error) {
    yield put(stageFetchingErrors(error))
    yield put(endStageFetching())
  }
}

export function* handleRegisterSaga(): Generator {
  yield takeEvery('COMPLETE_STAGE', completeStage)
}
