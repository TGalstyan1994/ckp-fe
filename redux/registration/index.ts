import { createSlice } from '@reduxjs/toolkit';

export interface IRegistrationInfo {
  sponsor: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
}

const initialState: IRegistrationInfo = {
  sponsor: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  gender: '',
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setSponsorNameAction(state, action) {
      state.sponsor = action.payload;
    },
    setEmailAction(state, action) {
      state.email = action.payload;
    },
    setFirstNameAction(state, action) {
      state.firstName = action.payload;
    },
    setLastNameAction(state, action) {
      state.lastName = action.payload;
    },
    setPhoneAction(state, action) {
      state.phone = action.payload;
    },
    setGenderAction(state, action) {
      state.gender = action.payload;
    },
  },
});

const { actions, reducer } = registrationSlice;

export const {
  setSponsorNameAction,
  setEmailAction,
  setFirstNameAction,
  setLastNameAction,
  setPhoneAction,
  setGenderAction,
} = actions;

export default reducer;
