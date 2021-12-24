import { spawn, call, all } from 'redux-saga/effects'
import { handleLoginSaga } from './signinSaga'
import {
  handleRegisterSaga,
  handleGeoSaga,
  handlePersonalDetailsSaga,
  handleConfirmDetailsSaga,
} from './signupSaga'
import { handleGeoTakeSaga } from './signupSaga/geo-take'
import { handleChangePasswordSaga } from './forgotPassword'
import { handleSetNewPasswordSaga } from './newPassword'

export default function* rootSaga() {
  const sagas = [
    handleLoginSaga,
    handleRegisterSaga,
    handleGeoTakeSaga,
    handleGeoSaga,
    handlePersonalDetailsSaga,
    handleConfirmDetailsSaga,
    handleChangePasswordSaga,
    handleSetNewPasswordSaga,
  ]
  // @ts-ignore
  const retrySagas = yield sagas.map((saga) =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (error) {
          console.error(error)
          break
        }
      }
    })
  )

  yield all(retrySagas)
}
