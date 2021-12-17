import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stages: [
    {
      number: 1,
      title: 'login password',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      fetching: false,
      fetchError: '',
      finished: false
    },
    {
      number: 2,
      title: 'security pin',
      errors: {
        pin: '',
        confirmPin: ''
      },
      fetching: false,
      fetchError: '',
      finished: false
    },
    {
      number: 3,
      title: 'security question',
      currentOption: '',
      options: {
        'Enter the name of your first pet': 'FIRST_PET_NAME'
      },
      errors: {
        answer: ''
      },
      fetching: false,
      fetchError: '',
      finished: false
    },
    {
      number: 4,
      initialData: {
        objective: '',
        objectiveNote: '',
        firstName: '',
        lastName: '',
        phone: '',
        phoneParsed: {
          country: '',
          phone: ''
        },
        address: '',
        gender: 'Male',
        maritalStatus: '',
        dateOfBirth: '',
        сurrentlyEmployed: undefined,
        jobTitle: '',
        jobDescription: '',
        employeeAddress: '',
        businessOwner: undefined,
        businessDescription: '',
        anyTrade: undefined,
        tradeDescription: '',
        anyTechnicalSkills: undefined,
        technicalSkillsDescription: '',
        anyAthleticSkills: undefined,
        athleticSkillsDescription: '',
        anyDependents: undefined,
        totalNumberOfDependens: '',
        beneficiaryName: '',
        beneficiaryRelationship: '',
        beneficiaryContactNumber: '',
        cityId: undefined,
        stateId: undefined,
        countryId: -1,
        zipCode: ''
      },
      errors: {
        objective: '',
        objectiveNote: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        gender: '',
        maritalStatus: '',
        dateOfBirth: '',
        сurrentlyEmployed: '',
        jobTitle: '',
        jobDescription: '',
        employeeAddress: '',
        businessOwner: '',
        businessDescription: '',
        anyTrade: '',
        tradeDescription: '',
        anyTechnicalSkills: '',
        technicalSkillsDescription: '',
        anyAthleticSkills: '',
        athleticSkillsDescription: '',
        anyDependents: '',
        totalNumberOfDependens: '',
        beneficiaryName: '',
        beneficiaryRelationship: '',
        beneficiaryContactNumber: '',
        cityId: '',
        stateId: '',
        countryId: '',
        zipCode: ''
      },
      finished: false,
      fetchError: '',
      title: 'personal details'
    },
    {
      number: 5,
      finished: false,
      title: 'payment details',
      confirmData: {
        email: '',
        firstName: '',
        gender: '',
        iSConfirmed: false,
        isProfileComplete: false,
        isSecurityCodeComplete: false,
        isSecurityQuestionComplete: false,
        isWalletComplete: false,
        lastName: '',
        phone: '',
        sponsor: ''
      }
    },
    {
      number: 6,
      finished: false,
      title: 'confirm'
    }
  ],
  userInfo: {
    country: {
      id: -1,
      name: '',
      phonecode: '',
      phonemask: ''
    },
    states: [],
    cities: []
  },
  currentStage: 0
};

export type SignUpState = typeof initialState

const signup = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    finishStage(state) {
      state.stages[state.currentStage].finished = true;
      state.currentStage += 1;
    },

    backStage(state) {
      state.currentStage -= 1;
      state.stages[state.currentStage].finished = false;
    },

    stageFetchingErrors(state, action) {
      if (action.payload !== '')
        state.stages[state.currentStage].fetchError =
          action.payload.response.data.message;
      else state.stages[state.currentStage].fetchError = '';
    },

    startStageFetching(state) {
      state.stages[state.currentStage].fetching = true;
    },

    endStageFetching(state) {
      state.stages[state.currentStage].fetching = false;
    },

    changeStage(state, action) {
      state.currentStage = action.payload;
    },

    validateStage(state, action) {
      state.stages[state.currentStage].errors = action.payload.errors;
    },

    setCurrentOption(state, action) {
      state.stages[state.currentStage].currentOption = action.payload;
    },

    setUserGeo(state, action) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload
      };
    },

    resetSignup(state) {
      state.stages = initialState.stages;
      state.userInfo = initialState.userInfo;
      state.currentStage = initialState.currentStage;
    },

    setInitialPersonalDetails(state, action) {
      state.stages[3].initialData = action.payload;
    },

    setConfirmDetails(state, action) {
      state.stages[4].confirmData =  action.payload
    }
  }
});
export const {
  setCurrentOption,
  finishStage,
  validateStage,
  stageFetchingErrors,
  startStageFetching,
  endStageFetching,
  setUserGeo,
  resetSignup,
  setInitialPersonalDetails,
  backStage,
  setConfirmDetails
} = signup.actions;
export default signup.reducer;
