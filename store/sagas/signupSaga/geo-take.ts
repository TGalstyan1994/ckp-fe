import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import { Action } from 'store'
import { endStageFetching, setFetchingErrors } from 'store/reducers/signin'
import { setUserGeo } from 'store/reducers/signup'

function* geoTake(action: Action) {
  const reqUrl = `${process.env.NEXT_PUBLIC_API}/geo/${
    action.payload.at === 'states'
      ? `states?countryId=${action.payload.countryId}`
      : `cities?stateId=${action.payload.stateId}`
  }`
  try {
    const response: AxiosResponse = yield call(axios.get, reqUrl)
    const stateObject = {} as { states?: unknown; cities?: unknown }
    if (action.payload.at === 'states') {
      stateObject.states = response.data
    } else {
      stateObject.cities = response.data
    }
    yield put(setUserGeo(stateObject))
    yield put(endStageFetching())
  } catch (error) {
    yield put(setFetchingErrors(error))
    yield put(endStageFetching())
  }
}

export function* handleGeoTakeSaga(): Generator {
  yield takeEvery('GEO_TAKE', geoTake)
}
