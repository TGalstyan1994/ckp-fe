import { createSlice } from 'node_modules/@reduxjs/toolkit/dist';
import { ISignInStore, ISignInRes } from '../../interfaces/signin/signin';

const initialSignInResState: ISignInRes = {
  accessToken: '',
  registrationStatus: {
    confirm: false,
    profile: false,
    securityCode: false,
    securityQuestion: false,
    wallet: false
  },
  user: {
    email: '',
    id: -1,
    status: '',
    username: ''
  }
};

const initialState: ISignInStore = {
  errors: {
    username: '',
    password: ''
  },
  fetching: false,
  fetchingErrors: '',
  data: initialSignInResState
};
export type SignInState = typeof initialState

const signin = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    setFetchingErrors(state, action) {
      state.fetchingErrors = action.payload.response.data.message;
    },
    resetFetchingError(state){
      state.fetchingErrors = ''
    },
    startStageFetching(state) {
      state.fetching = true;
    },

    validateForm(state, action) {
      state.errors = {
        ...state.errors,
        ...action.payload.errors
      };
    },

    stopFetching(state) {
      state.fetching = false;
    },

    endStageFetching(state, action) {
      state.data = action.payload;
      state.fetching = false;
    },

    logOut(state) {
      state.data = initialSignInResState;
      state.fetchingErrors = '';
    }
  }
});

export const {
  validateForm,
  setFetchingErrors,
  startStageFetching,
  endStageFetching,
  stopFetching,
  logOut,
  resetFetchingError
} = signin.actions;

export default signin.reducer;
