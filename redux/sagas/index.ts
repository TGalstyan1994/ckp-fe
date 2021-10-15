import { spawn, call, all } from 'redux-saga/effects'
import { handleLoginSaga } from './signinSaga'

export default function* rootSaga() {
  const sagas = [handleLoginSaga]
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
