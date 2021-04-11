import { createSlice } from '@reduxjs/toolkit';

interface IRegistrationInfo {
  sponsor: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const initialState: IRegistrationInfo = {
  sponsor: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setSponsorName(state, action) {
      state.sponsor = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
  },
});

const { actions, reducer } = registrationSlice;

export const { setSponsorName, setEmail, setFirstName, setLastName, setPhone } = actions;

export default reducer;
