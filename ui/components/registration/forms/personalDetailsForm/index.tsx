import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setFirstNameAction,
  setGenderAction,
  setLastNameAction,
  setPhoneAction,
} from 'redux/registration';
import { Button } from 'ui/components/common/button';
import { Checkbox } from 'ui/components/common/checkbox';
import { Input } from 'ui/components/common/input';
import { Select } from 'ui/components/common/select';
import { LinkText } from 'ui/typography';
import {
  BirthContainer,
  H1Styled,
  InputsContainer,
  QuestionsContaainer,
  SelectStyled,
  TextareaStyled,
  RadioStyled,
  EmployedContainer,
  InputDescription,
  ButtonsContainer,
} from './styled';

const PersonalDetailsForm: React.FC = () => {
  const [objective, setObjective] = useState<string>('');
  const [objectiveNote, setObjectiveNote] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [isEmployed, setEmployed] = useState<boolean>(false);
  const [isOwner, setOwner] = useState<boolean>(false);
  const [haveTrade, setTrade] = useState<boolean>(false);
  const [haveTechSkills, setTechSkills] = useState<boolean>(false);
  const [haveAthleticSkills, setAthleticSkills] = useState<boolean>(false);
  const [haveDependend, setDependend] = useState<boolean>(false);
  const [beneficiaryName, setBeneficiaryName] = useState<string>('');
  const [
    beneficiaryRelationship,
    setBeneficiaryRelationship,
  ] = useState<string>('');
  const [beneficiaryPhone, setBeneficiaryPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [isConditionsAccepted, setAccepted] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [employeAddress, setEmployeAddress] = useState<string>('');
  const [businessDescription, setBusinessDescription] = useState<string>('');
  const [tradeDescription, setTradeDescription] = useState<string>('');
  const [techScillDescription, setTechScillDescription] = useState<string>('');
  const [
    athleticScillDescription,
    setAthleticScillDescription,
  ] = useState<string>('');
  const [dependentCount, setDependentCount] = useState<string>('');

  const dispatch = useDispatch();

  const handleChangeGender = (val: string) => {
    setGender(val);
    dispatch(setGenderAction(val));
  };

  const handleChangeFirstName = (val: string) => {
    setFirstName(val);
    dispatch(setFirstNameAction(val));
  };

  const handleChangeLastName = (val: string) => {
    setLastName(val);
    dispatch(setLastNameAction(val));
  };

  const handleChangePhone = (val: string) => {
    setPhone(val);
    dispatch(setPhoneAction(val));
  };

  return (
    <>
      <H1Styled>Personal Details</H1Styled>
      <SelectStyled
        value={objective}
        onChange={(val) => setObjective(val)}
        label="Objective"
        placeholder="Objective"
        required
        options={[
          'Start a business',
          'Buy income generating property',
          'Secure college funds',
          'Home ownership',
          'Better health care',
          'Dream vacation',
          'Furnish home',
          'Buy new vehicle',
          'Other',
        ]}
      />
      <TextareaStyled
        label="Objective Note"
        placeholder=""
        required
        value={objectiveNote}
        onChange={(val) => setObjectiveNote(val)}
      />
      <InputsContainer>
        <Input
          label="First name"
          placeholder="First name"
          value={firstName}
          onChange={(val) => setFirstName(val)}
          required
          onBlur={({ target }) => handleChangeFirstName(target.value)}
        />
        <Input
          label="Last name"
          placeholder="Last name"
          value={lastName}
          onChange={(val) => setLastName(val)}
          required
          onBlur={({ target }) => handleChangeLastName(target.value)}
        />
        <Input
          label="Phone number"
          placeholder="Phone number"
          value={phone}
          onChange={(val) => setPhone(val)}
          required
          onBlur={({ target }) => handleChangePhone(target.value)}
        />
        <Input
          label="Address"
          placeholder="Address"
          value={address}
          onChange={(val) => setAddress(val)}
          required
        />
      </InputsContainer>
      <BirthContainer>
        <Select
          label="Date of birth"
          required
          placeholder=""
          value={birthDay}
          onChange={setBirthDay}
          options={[Array.from({ length: 31 })].map((elem, i) => `${i + 1}`)}
        />
        <Select
          placeholder=""
          required
          value={birthMonth}
          onChange={setBirthMonth}
          options={[Array.from({ length: 12 })].map((elem, i) => `${i + 1}`)}
        />
        <Select
          placeholder=""
          required
          value={birthYear}
          onChange={setBirthYear}
          options={[Array.from({ length: 31 })].map((elem, i) => `${i + 1}`)}
        />
      </BirthContainer>
      <QuestionsContaainer>
        <RadioStyled
          label="Gender"
          required
          options={['Male', 'Female', 'Other']}
          value={gender}
          onChange={setGender}
        />
        <Select
          label="Marital status"
          placeholder=""
          required
          value={maritalStatus}
          onChange={setMaritalStatus}
          options={[
            'Single',
            'Married',
            'Divorced',
            'Common-law',
            'Widow/widower',
          ]}
        />
        <RadioStyled
          label="Are You Currently Employed?"
          required
          options={['Yes', 'No']}
          value={isEmployed ? 'Yes' : 'No'}
          onChange={(val) => setEmployed(val === 'Yes')}
        />
        {isEmployed ? (
          <EmployedContainer>
            <InputDescription
              placeholder="Job Title"
              value={jobTitle}
              onChange={setJobTitle}
            />
            <InputDescription
              placeholder="Job Description"
              value={jobDescription}
              onChange={setJobDescription}
            />
            <InputDescription
              placeholder="Employee Address"
              value={employeAddress}
              onChange={setEmployeAddress}
            />
          </EmployedContainer>
        ) : (
          <div />
        )}
        <RadioStyled
          label="Are You a Business Owner?"
          required
          options={['Yes', 'No']}
          value={isOwner ? 'Yes' : 'No'}
          onChange={(val) => setOwner(val === 'Yes')}
        />
        {isOwner ? (
          <InputDescription
            placeholder="Business Description"
            value={businessDescription}
            onChange={setBusinessDescription}
          />
        ) : (
          <div />
        )}
        <RadioStyled
          label="Do You Have any Trade?"
          required
          options={['Yes', 'No']}
          value={haveTrade ? 'Yes' : 'No'}
          onChange={(val) => setTrade(val === 'Yes')}
        />
        {haveTrade ? (
          <InputDescription
            placeholder="Trade Description"
            value={tradeDescription}
            onChange={setTradeDescription}
          />
        ) : (
          <div />
        )}
        <RadioStyled
          label="Do you Have any Technical skills?"
          required
          options={['Yes', 'No']}
          value={haveTechSkills ? 'Yes' : 'No'}
          onChange={(val) => setTechSkills(val === 'Yes')}
        />
        {haveTechSkills ? (
          <InputDescription
            placeholder="Skill Description"
            value={techScillDescription}
            onChange={setTechScillDescription}
          />
        ) : (
          <div />
        )}
        <RadioStyled
          label="Do you Have any Athletic skills?"
          required
          options={['Yes', 'No']}
          value={haveAthleticSkills ? 'Yes' : 'No'}
          onChange={(val) => setAthleticSkills(val === 'Yes')}
        />
        {haveAthleticSkills ? (
          <InputDescription
            placeholder="Skill Description"
            value={athleticScillDescription}
            onChange={setAthleticScillDescription}
          />
        ) : (
          <div />
        )}
        <RadioStyled
          label="Do You Have Any Dependent?"
          required
          options={['Yes', 'No']}
          value={haveDependend ? 'Yes' : 'No'}
          onChange={(val) => setDependend(val === 'Yes')}
        />
        {haveDependend ? (
          <InputDescription
            placeholder="Total Number of Dependents"
            value={dependentCount}
            onChange={setDependentCount}
          />
        ) : (
          <div />
        )}
      </QuestionsContaainer>
      <Input
        label="Beneficiary"
        required
        placeholder="Name"
        value={beneficiaryName}
        onChange={setBeneficiaryName}
      />
      <InputsContainer>
        <Input
          required
          placeholder="Relationship"
          value={beneficiaryRelationship}
          onChange={setBeneficiaryRelationship}
        />
        <Input
          required
          placeholder="Contact Number"
          value={beneficiaryPhone}
          onChange={setBeneficiaryPhone}
        />
        <Select
          placeholder=""
          label="Country"
          required
          options={['Trinidad and Tobago']}
          value={country}
          onChange={setCountry}
        />
        <Select
          placeholder=""
          label="State"
          required
          options={['Arime-Tunapuna-Piarco']}
          value={state}
          onChange={setState}
        />
        <Input
          label="City"
          required
          placeholder="Enter City"
          value={city}
          onChange={setCity}
        />
        <Input
          label="Zip code"
          required
          placeholder="Enter Zip Code"
          value={zip}
          onChange={setZip}
        />
        <Checkbox value={isConditionsAccepted} onChange={setAccepted}>
          <LinkText primary>Accept Terms and Conditions</LinkText>
        </Checkbox>
        <ButtonsContainer>
          <Button>BACK</Button>
          <Button primary disabled>
            CONTINUE
          </Button>
        </ButtonsContainer>
      </InputsContainer>
    </>
  );
};

export default PersonalDetailsForm;
