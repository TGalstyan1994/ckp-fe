import { takeEvery, put, call, select } from '@redux-saga/core/effects';
import axios, { AxiosResponse } from 'axios';
import { RegistrationAction, RootState } from '../../index';
import {
  endStageFetching,
  finishStage, setConfirmDetails, setInitialPersonalDetails,
  setUserGeo,
  SignUpState,
  stageFetchingErrors
} from 'src/store/reducers/signup';
import {
  getAccessToken,
  getSponsorByQuery,
  removeToken,
  setAccessToken
} from 'src/utils';

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
    captchaOnLoad: () => void;
  }
}

type RegistrationPayload = {
  captcha: string
  body: Record<string, string>
}

const getStages = (state: RootState) => state.signup;

const config = () => ({
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`,
    'content-type': 'application/json'
  }
});

function* completeStage(action: RegistrationAction) {
  const { currentStage, stages }: SignUpState = yield select(getStages);
  const { payload, apiUrl } = action;
  if (!stages[0].finished) removeToken();

  try {
    if (currentStage === 0) {
      // first registration stage/step
      const { captcha, body } = payload as RegistrationPayload;

      body.sponsor = getSponsorByQuery();

      const registrationPayload = {
        captcha,
        body
      };
      const response: AxiosResponse = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}${apiUrl}`,
        registrationPayload
      );

      setAccessToken(response.data.accessToken);
    } else {
      yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_API}${apiUrl}`,
        payload,
        config()
      );
    }

    yield put(stageFetchingErrors(''));
    yield put(endStageFetching());
    yield put(finishStage());
  } catch (error) {
    yield put(stageFetchingErrors(error));
    yield put(endStageFetching());
  }
}

export function* handleRegisterSaga(): Generator {
  yield takeEvery('COMPLETE_STAGE', completeStage);
}

function* handelGeoDetails(): Generator {
  try {
    const geoResponse: AxiosResponse = yield call(
      axios.post,
      `${process.env.NEXT_PUBLIC_API}/api/helpers/geo/detect`
    );
    yield put(setUserGeo(geoResponse.data));
  } catch (e) {
    throw e;
  }

}

export function* handleGeoSaga(): Generator {
  yield takeEvery('GEO_DETAILS', handelGeoDetails);
}

export function* handlePersonalDetails(): Generator {

  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API}/api/account/registration/get-personal-details`,
      config()
    );
    yield put(setInitialPersonalDetails(response.data));
  } catch (e) {
    throw e;
  }

}

export function* handlePersonalDetailsSaga(): Generator {
  yield takeEvery('GET_PERSONAL_DETAILS', handlePersonalDetails);
}

export function* handleConfirmDetails(): Generator {

  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${process.env.NEXT_PUBLIC_API}/api/account/registration/get-confirm-information`,
      config()
    );
    yield put(setConfirmDetails(response.data));
  } catch (e) {
    throw e;
  }

}

export function* handleConfirmDetailsSaga(): Generator {
  yield takeEvery('GET_CONFIRM_DETAILS', handleConfirmDetails);
}