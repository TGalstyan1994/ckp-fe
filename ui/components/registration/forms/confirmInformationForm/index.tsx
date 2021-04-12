import React from 'react';
import { useSelector } from 'react-redux';
import {
  getEmailSelector,
  getFirstNameSelector,
  getGenderSelector,
  getLastNameSelector,
  getPhoneSelector,
  getSponsorNameSelector,
} from 'redux/registration/selectors';

const ConfirmInformationForm: React.FC = () => {
  const sponsor = useSelector(getSponsorNameSelector);
  const firstName = useSelector(getFirstNameSelector);
  const lastName = useSelector(getLastNameSelector);
  const email = useSelector(getEmailSelector);
  const phone = useSelector(getPhoneSelector);
  const gender = useSelector(getGenderSelector);

  return (
    <div>
      <p>sponsor: {sponsor}</p>
      <p>firstName: {firstName}</p>
      <p>lastName: {lastName}</p>
      <p>email: {email}</p>
      <p>phone: {phone}</p>
      <p>gender: {gender}</p>
    </div>
  );
};

export default ConfirmInformationForm;
