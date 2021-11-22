import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stages: [
    {
      number: 1,
      title: 'login password',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      fetching: false,
      fetchError: '',
      finished: false,
    },
    {
      number: 2,
      title: 'security pin',
      errors: {
        pin: '',
        confirmPin: '',
      },
      fetching: false,
      fetchError: '',
      finished: false,
    },
    {
      number: 3,
      title: 'security question',
      currentOption: '',
      options: {
        'Enter the name of your first pet': 'FIRST_PET_NAME',
      },
      errors: {
        answer: '',
      },
      fetching: false,
      fetchError: '',
      finished: false,
    },
    {
      number: 4,

      errors: {
        phoneCode: '',
        phoneNumber: '',
      },
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
  userInfo: {
    country: {
      id: 221,
      name: 'Trinidad And Tobago',
      phonemask: '(000) 000-00000',
      phonecode: '1868',
    },
  },
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

    setCurrentOption(state, action) {
      state.stages[state.currentStage].currentOption = action.payload
    },

    setUserGeo(state, action) {
      state.userInfo.country = action.payload
    },
  },
})
export const {
  setCurrentOption,
  finishStage,
  changeStage,
  validateStage,
  stageFetchingErrors,
  startStageFetching,
  endStageFetching,
  setUserGeo,
} = signup.actions
export default signup.reducer
