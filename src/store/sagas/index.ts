import { spawn, call, all } from 'redux-saga/effects'
import { handleLoginSaga } from './signinSaga'
import {
  handleRegisterSaga,
  handleGeoSaga,
  handlePersonalDetailsSaga,
  handleConfirmDetailsSaga,
} from './signupSaga'
import { handleGeoTakeSaga } from './signupSaga/geo-take'

export default function* rootSaga() {
  const sagas = [
    handleLoginSaga,
    handleRegisterSaga,
    handleGeoTakeSaga,
    handleGeoSaga,
    handlePersonalDetailsSaga,
    handleConfirmDetailsSaga,
  ]
  // @ts-ignore
  const retrySagas = yield sagas.map((saga) =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.error(e)
          break
        }
      }
    })
  )

  yield all(retrySagas)
}
