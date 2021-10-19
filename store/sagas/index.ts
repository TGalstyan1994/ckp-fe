import { spawn, call, all } from 'redux-saga/effects'
import { handleLoginSaga } from './signinSaga'
import { handleRegisterSaga } from './signupSaga'

export default function* rootSaga() {
  const sagas = [handleLoginSaga, handleRegisterSaga]
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
