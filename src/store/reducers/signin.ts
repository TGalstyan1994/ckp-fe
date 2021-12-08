import { createSlice } from 'node_modules/@reduxjs/toolkit/dist';
import { ISignInStore, ISignInRes } from '../../interfaces/signin/signin';

const initialSignInResState: ISignInRes =  {
  accessToken: '',
    registrationStatus: {
    confirm: false,
      profile: false,
      securityCode: false,
      securityQuestion: false,
  },
  user: {
    email: '',
      id: 0,
      status: '',
      username: '',
  }
}

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

    startStageFetching(state) {
      state.fetching = true;
    },

    endStageFetching(state, data: { payload: ISignInRes | undefined}) {
      state.fetching = false;
      if (data.payload) {
        state.data = data.payload;
      } else {
        state.data = initialSignInResState
      }
    },

    validateForm(state, action) {
      state.errors = action.payload.errors;
    }
  }
});

export const {
  validateForm,
  setFetchingErrors,
  startStageFetching,
  endStageFetching
} = signin.actions;

export default signin.reducer;
