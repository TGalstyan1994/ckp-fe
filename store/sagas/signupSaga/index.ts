import { takeEvery, put, call, select } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import { RegistrationAction, RootState } from 'store'
import {
  endStageFetching,
  finishStage,
  setUserGeo,
  SignUpState,
  stageFetchingErrors,
} from 'store/reducers/signup'
import {
  getAccessToken,
  getSponsorByQuery,
  removeToken,
  setAccessToken,
} from 'utils'

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance
    captchaOnLoad: () => void
  }
}

type RegistrationPayload = {
  captcha: string
  body: Record<string, string>
}

const getStages = (state: RootState) => state.signup

function* completeStage(action: RegistrationAction) {
  const { currentStage, stages }: SignUpState = yield select(getStages)
  const { payload, apiUrl } = action
  if (!stages[0].finished) removeToken()

  const config = {
    headers: {
      // eslint-disable-next-line prettier/prettier
      'Authorization': `Bearer ${getAccessToken()}`, // => Prettier removes single quotes from Authorization flag
      'content-type': 'application/json',
    },
  }

  try {
    if (currentStage === 0) {
      // first registration stage/step
      const { captcha, body } = payload as RegistrationPayload

      body.sponsor = getSponsorByQuery()

      const registrationPayload = {
        captcha,
        body,
      }
      const response: AxiosResponse = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}${apiUrl}`,
        registrationPayload
      )

      const geoResponse: AxiosResponse = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}/api/helpers/geo/detect
        `
      )
      yield put(setUserGeo(geoResponse))

      console.log(geoResponse)

      setAccessToken(response.data.accessToken)
    } else {
      yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}${apiUrl}`,
        payload,
        config
      )
    }

    yield put(stageFetchingErrors(''))
    yield put(endStageFetching())
    yield put(finishStage())
  } catch (error) {
    yield put(stageFetchingErrors(error))
    yield put(endStageFetching())
  }
}

export function* handleRegisterSaga(): Generator {
  yield takeEvery('COMPLETE_STAGE', completeStage)
}
