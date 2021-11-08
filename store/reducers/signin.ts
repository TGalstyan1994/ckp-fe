import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

const initialState = {
  errors: {
    username: '',
    password: '',
  },
  fetching: false,
  fetchingErrors: '',
}
export type SignInState = typeof initialState

const signin = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    setFetchingErrors(state, action) {
      state.fetchingErrors = action.payload.response.data.message
    },

    startStageFetching(state) {
      state.fetching = true
    },

    endStageFetching(state) {
      state.fetching = false
    },

    validateForm(state, action) {
      state.errors = action.payload.errors
    },
  },
})

export const {
  validateForm,
  setFetchingErrors,
  startStageFetching,
  endStageFetching,
} = signin.actions

export default signin.reducer
