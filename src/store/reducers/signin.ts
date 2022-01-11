import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'
import { ISignInStore, ISignInRes } from '../../interfaces/signin/signin'
import { removeToken } from '../../utils'

const initialSignInResState: ISignInRes = {
  accessToken: '',
  registrationStatus: {
    confirm: false,
    profile: false,
    securityCode: false,
    securityQuestion: false,
    wallet: false,
  },
  user: {
    email: '',
    id: -1,
    status: '',
    username: '',
  },
}

const initialState: ISignInStore = {
  errors: {
    username: '',
    password: '',
  },
  fetching: false,
  fetchingErrors: '',
  data: initialSignInResState,
}
export type SignInState = typeof initialState

const signin = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    setFetchingErrors(state, action) {
      const mess = action.payload.response.data.message
      state.fetchingErrors =
        typeof mess === 'string'
          ? action.payload.response.data.message
          : mess?.map((item: any) => item.messages[0])
    },
    resetFetchingError(state) {
      state.fetchingErrors = ''
    },
    startStageFetching(state) {
      state.fetching = true
    },

    validateForm(state, action) {
      state.errors = {
        ...state.errors,
        ...action.payload.errors,
      }
    },

    stopFetching(state) {
      state.fetching = false
    },

    endSignInStageFetching(state, action) {
      state.data = action.payload
      state.fetching = false
    },

    storeAccessToken(state, action) {
      state.data.accessToken = action.payload
    },

    resetToken(state) {
      state.data = initialSignInResState
      state.fetchingErrors = ''
    },
    logOut(state) {
      removeToken()
      state.data = initialSignInResState
      state.fetchingErrors = ''
    },
  },
})

export const {
  validateForm,
  setFetchingErrors,
  startStageFetching,
  endSignInStageFetching,
  stopFetching,
  logOut,
  resetFetchingError,
  storeAccessToken,
  resetToken,
} = signin.actions

export default signin.reducer
