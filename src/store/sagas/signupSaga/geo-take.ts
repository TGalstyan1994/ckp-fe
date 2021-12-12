import { call, takeEvery, put } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import { Action } from '../../index'
import { setFetchingErrors } from 'src/store/reducers/signin'
import { setUserGeo } from 'src/store/reducers/signup'

function* geoTake(action: Action) {
  const reqUrl = `${process.env.NEXT_PUBLIC_API}/api/helpers/geo/${
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
  } catch (error) {
    yield put(setFetchingErrors(error))
  }
}

export function* handleGeoTakeSaga(): Generator {
  yield takeEvery('GEO_TAKE', geoTake)
}
