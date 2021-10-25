import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stages: [
    {
      number: 1,
      finished: false,
      title: 'login password',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      fetchError: '',
      fetching: false,
    },
    {
      number: 2,
      finished: false,
      title: 'security pin',
    },
    {
      number: 3,
      finished: false,
      title: 'security question',
    },
    {
      number: 4,
      finished: false,
      title: 'presonal details',
    },
    {
      number: 5,
      finished: false,
      title: 'payment details',
    },
    {
      number: 6,
      finished: false,
      title: 'confirm',
    },
  ],
  currentStage: 0,
}

export type SignUpState = typeof initialState

const signup = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    finishStage(state) {
      state.stages[state.currentStage].finished = true

      state.currentStage += 1
      // state.stages = state.stages.map((stage) => {
      //   if (stage.number === action.payload) return { ...stage, finished: true }
      //   return stage
      // })
    },

    stageFetchingErrors(state, action) {
      if (action.payload !== '')
        state.stages[state.currentStage].fetchError =
          action.payload.response.data.message
      else state.stages[state.currentStage].fetchError = ''
    },

    startStageFetching(state) {
      state.stages[state.currentStage].fetching = true
    },

    endStageFetching(state) {
      state.stages[state.currentStage].fetching = false
    },

    changeStage(state, action) {
      state.currentStage = action.payload
    },

    validateStage(state, action) {
      state.stages[state.currentStage].errors = action.payload.errors
    },
  },
})
export const {
  finishStage,
  changeStage,
  validateStage,
  stageFetchingErrors,
  startStageFetching,
  endStageFetching,
} = signup.actions
export default signup.reducer
