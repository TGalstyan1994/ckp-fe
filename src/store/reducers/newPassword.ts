import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'
import { INewPasswordStore } from 'src/interfaces/newPassword/new-password'

const initialState: INewPasswordStore = {
  errors: {
    newPass: '',
    repeatPass: '',
  },
  fetching: false,
  fetchingErrors: '',
  data: {
    new: '',
    repeat: '',
  },
}

export type NewPasswordState = typeof initialState

const newPassword = createSlice({
  name: 'newPassword',
  initialState,
  reducers: {
    startFetching(state) {
      state.fetching = true
    },
    validateForm(state, action) {
      state.errors = {
        ...state.errors,
        ...action.payload.errors,
      }
    },
    resetFetchingError(state) {
      state.fetchingErrors = ''
    },
    stopFetching(state) {
      state.fetching = false
    },
    resetError(state, action) {
      state.errors = {
        ...state.errors,
        [action.payload]: '',
      }
    },

    endFetching(state, action) {
      state.data = action.payload
      state.fetching = false
    },
    setFetchingErrors(state, action) {
      state.fetchingErrors = action.payload.response.data.message
    },
  },
})

export const {
  validateForm,
  endFetching,
  startFetching,
  stopFetching,
  resetFetchingError,
  setFetchingErrors,
  resetError,
} = newPassword.actions

export default newPassword.reducer
