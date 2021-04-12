import { RootState } from 'redux/index';

const slice = 'registration';

export const getSponsorNameSelector = (state: RootState): string => {
  return state[slice].sponsor;
};

export const getEmailSelector = (state: RootState): string => {
  return state[slice].email;
};

export const getFirstNameSelector = (state: RootState): string => {
  return state[slice].firstName;
};

export const getLastNameSelector = (state: RootState): string => {
  return state[slice].lastName;
};

export const getPhoneSelector = (state: RootState): string => {
  return state[slice].phone;
};

export const getGenderSelector = (state: RootState): string => {
  return state[slice].gender;
};
