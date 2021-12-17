import { Select } from 'src/components/Select';
import { TextArea } from 'src/components/Textarea';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectorTyped } from 'src/utils/hooks';
import {
  endStageFetching,
  startStageFetching,
  validateStage
} from 'src/store/reducers/signup';
import { haveErrors } from 'src/utils';
import { PhoneNumberForm } from 'src/containers/PhoneNumberForm';
import { LinkText } from 'src/components/LinkText';
import { Button } from 'src/components/Button';
import { Input } from 'src/components/Input';
import { getPersonalDetails, sendPersonalDetails } from 'src/store/actions/signup';
import { DatePickerForm } from 'src/containers/DatePickerForm';
import classNames from 'classnames';
import { ChooseGenderForm } from 'src/containers/ChooseGenderForm';
import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm';
import { CheckBox } from 'src/components/CheckBox';
import { ErrorsSpan } from 'src/components/ErrorsSpan';
import { H1 } from 'src/components/H1';
import {
  form,
  form_actions,
  actions_buttons,
  form_fullName,
  form_phone_address,
  martial_gender,
  select_stabilizer,
  options_wrapper,
  double_input,
  job_question_inputs,
  row,
  margin_cont,
  row_employed
} from './style.module.css';
import { validate } from './validate';
import vector from 'src/UI/Vector.svg';

const maritalStatusCodes = {
  'SINGLE': 'Single',
  'MARRIED': 'Married',
  'DIVORCED': 'Divorced',
  'COMMON_LAW': 'Common-law',
  'WIDOW_WIDOWER': 'Widow/widower'
} as { [key: string]: string };

const objectiveCodes = {
  'START_BUSINESS': 'Start a business',
  'PROPERTY_PURCHASE': 'Buy income generating property',
  'SECURE_COLLEGE_FUNDS': 'Secure college funds',
  'HOME_OWNERSHIP': 'Home ownership',
  'HEALTHCARE': 'Better health care',
  'VACATION': 'Dream vacation',
  'FURNISH': 'Furnish home',
  'VEHICLE_PURCHASE': 'Buy new vehicle',
  'OTHER': 'Other'
} as { [key: string]: string };

export const PersonalDetails: FC = () => {
  const { errors, fetching, fetchError, initialData } = useSelectorTyped((state) => state.signup.stages[3]);
  const { country, states, cities } = useSelectorTyped((state) => state.signup.userInfo);

  const [personalDetailsState, setPersonalDetailsState] = useState({
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
    countryId: country.id,
    zipCode: ''
  });

  const [termsAcceptance, setTermsAcceptance] = useState(false);
  const [geoData, setGeoData] = useState({
    state: '',
    city: ''
  });

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: ''
  });

  const [phoneState, setPhoneState] = useState({
    phoneCode: country.phonecode.slice(1),
    phoneNumber: ''
  });

  const dispatch = useDispatch();

  const setPersonalDetails = (key: string, value: string | boolean | number) => {
    setPersonalDetailsState((prev) => ({ ...prev, [key]: value }));
  };

  const changePhoneState = (value: string, name: string) => {
    setPhoneState((prev) => ({ ...prev, [name]: value }));
  };

  const changeGeoStates = (option: string) => {

    const currentState = states.find(
      (state: Record<string, string>) => state.name === option
    ) as { id: number; name: string } | undefined;

    if (currentState) {
      dispatch({
        type: 'GEO_TAKE',
        payload: {
          stateId: currentState.id,
          at: 'cities'
        }
      });
      setPersonalDetails('stateId', currentState.id);
    }
    setGeoData((prev) => ({ ...prev, state: option, city: '' }));
  };

  const changeGeoCities = (option: string) => {
    const currentCity = cities.find(
      (city: Record<string, string>) => city.name === option
    ) as { id: number; name: string } | undefined;

    setGeoData((prev) => ({ ...prev, city: option }));
    if (currentCity) setPersonalDetails('cityId', currentCity.id);
  };

  const handleForm = () => {
    dispatch(startStageFetching());

    const validationErrors = validate({
      ...personalDetailsState,
      dateOfBirth,
      phone: `${phoneState.phoneCode}${phoneState.phoneNumber}`
    });

    dispatch(validateStage({ errors: validationErrors }));

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching());
      return;
    }

    const currentFormState = {
      ...personalDetailsState,
      phone: `+${phoneState.phoneCode}${phoneState.phoneNumber}`,
      dateOfBirth: new Date(
        +dateOfBirth.year,
        +dateOfBirth.month,
        +dateOfBirth.day + 1
      )
        .toJSON()
        .slice(0, 10)
    };
    const { phoneParsed, ...body } = currentFormState;
    // @ts-ignore
    dispatch(sendPersonalDetails(body));
  };

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => setPersonalDetails(e.target.name, e.target.value);

  useEffect(() => {

    if (country.id < 0) return;
    dispatch({
      type: 'GEO_TAKE',
      payload: { countryId: country.id, at: 'states' }
    });

    setPhoneState({
      ...phoneState,
      phoneCode: country.phonecode
    });

    setPersonalDetailsState({
      ...personalDetailsState,
      countryId: country.id
    })
  }, [country.id]);

  useEffect(() => {
    if (!(initialData && initialData.dateOfBirth)) return;

    const personalDateOfBirth = initialData.dateOfBirth?.split('-');
    const year = personalDateOfBirth && personalDateOfBirth[0];
    const month = personalDateOfBirth && +personalDateOfBirth[1] - 1;
    const day = personalDateOfBirth && +personalDateOfBirth[2];

    setDateOfBirth({
      year: year,
      month: '' + month,
      day: '' + day
    });

    const pCode = initialData?.phoneParsed.country.split('+');

    setPhoneState({
      phoneCode: '' + pCode[1],
      phoneNumber: initialData?.phoneParsed.phone
    });

    const currentState = states?.find(
      (state: Record<string, string>) => state.id === initialData.stateId
    ) as { id: number; name: string } | undefined;

    if (currentState) {
      dispatch({
        type: 'GEO_TAKE',
        payload: {
          stateId: currentState?.id,
          at: 'cities'
        }
      });
    }

    const cState = currentState?.name ?? '';
    setGeoData({
      ...geoData,
      state: cState
    });

    setPersonalDetailsState({
      ...personalDetailsState,
      ...initialData,
    });

    if (initialData?.zipCode) {
      setTermsAcceptance(true);
    }
  }, [initialData]);

  useEffect(() => {
    dispatch(getPersonalDetails());
  }, []);

  useEffect(() => {
    if (initialData?.cityId) {
      const currentCity = states.find(
        (state: Record<string, string>) => state.id === initialData.stateId
      ) as { id: number; name: string } | undefined;
      if (currentCity) {
        changeGeoCities(currentCity.name);
      }
    }
  }, [cities]);

  useEffect(() => {

  }, []);

  return (
    <div className={form}>
      <H1 secondary>Personal Details</H1>
      <Select
        label='Objective'
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
          'Other'
        ]}
        error={errors?.objective}
        currentOption={objectiveCodes[personalDetailsState.objective]}
        placeholder='Start a Business'
        setCurrentOption={(option: string) => {
          Object.keys(objectiveCodes).map((item: string) => {
            if (objectiveCodes[item] === option) {
              setPersonalDetails('objective', item);
            }
          });
        }
        }
      />

      <TextArea
        value={personalDetailsState.objectiveNote}
        onChange={handleFormInputs}
        name='objectiveNote'
        label='Objective Note'
        maxSymbols={512}
        required
        error={errors?.objectiveNote}
      />

      <div className={classNames(form_fullName, row)}>
        <Input
          name='firstName'
          onChange={handleFormInputs}
          value={personalDetailsState.firstName}
          label='First Name'
          required
          placeholder='Enter First Name'
          error={errors?.firstName}
        />
        <Input
          name='lastName'
          onChange={handleFormInputs}
          value={personalDetailsState.lastName}
          label='Last Name'
          required
          placeholder='Enter Last Name'
          error={errors?.lastName}
        />
      </div>

      <div className={classNames(form_phone_address, row)}>
        <PhoneNumberForm
          changeStateCallback={changePhoneState}
          phoneCode={country.phonecode}
          formState={{
            phoneCode: phoneState.phoneCode,
            phoneNumber: phoneState.phoneNumber
          }}
          personalDetailsStatePhone={personalDetailsState.phone}
          error={errors?.phone}
        />

        <Input
          name='address'
          onChange={handleFormInputs}
          value={personalDetailsState.address}
          label='Address'
          required
          placeholder='Enter Address'
          error={errors?.address}
          maxLength={255}
        />
      </div>

      <DatePickerForm
        dateForm={dateOfBirth}
        setDateForm={setDateOfBirth}
        error={errors?.dateOfBirth}
      />

      <div className={martial_gender}>
        <ChooseGenderForm
          onGenderChange={setPersonalDetails}
          genderState={personalDetailsState.gender}
        />
        <div className={select_stabilizer}>
          <Select
            label='Marital Status'
            required
            options={[
              'Single',
              'Married',
              'Divorced',
              'Common-law',
              'Widow/widower'
            ]}
            currentOption={maritalStatusCodes[personalDetailsState.maritalStatus]}
            placeholder='Single'
            setCurrentOption={(option: string) => {
              Object.keys(maritalStatusCodes).map((item: string) => {
                if (maritalStatusCodes[item] === option) {
                  setPersonalDetails('maritalStatus', item);
                }
              });
            }
            }
            error={errors?.maritalStatus}
          />
        </div>
      </div>
      <div className={options_wrapper}>
        <OptionalRadioForm
          name='jobTitle'
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('сurrentlyEmployed', value)
          }
          questionLabel='Are You Currently Employed?'
          placeholder='Job Title'
          answerState={personalDetailsState.сurrentlyEmployed}
          value={personalDetailsState.jobTitle}
          error={errors?.сurrentlyEmployed}
        />
        {personalDetailsState.сurrentlyEmployed && (
          <div className={classNames(row, job_question_inputs, row_employed)}>
            <Input
              onChange={handleFormInputs}
              name='jobDescription'
              value={personalDetailsState.jobDescription}
              placeholder='Job Description'
            />
            <Input
              onChange={handleFormInputs}
              name='employeeAddress'
              value={personalDetailsState.employeeAddress}
              placeholder='Employee Address'
            />
          </div>
        )}

        <OptionalRadioForm
          name='businessDescription'
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('businessOwner', value)}
          questionLabel='Are You a Business Owner?'
          placeholder='Business Description'
          answerState={personalDetailsState.businessOwner}
          value={personalDetailsState.businessDescription}
          error={errors?.businessOwner}
        />
        <OptionalRadioForm
          name='tradeDescription'
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('anyTrade', value)}
          questionLabel='Do You Have any Trade?'
          placeholder='Trade Description'
          answerState={personalDetailsState.anyTrade}
          value={personalDetailsState.tradeDescription}
          error={errors?.anyTrade}
        />
        <OptionalRadioForm
          name='technicalSkillsDescription'
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('anyTechnicalSkills', value)
          }
          questionLabel='Do you Have any Technical skills?'
          placeholder='Skill Description'
          answerState={personalDetailsState.anyTechnicalSkills}
          value={personalDetailsState.technicalSkillsDescription}
          error={errors?.anyTechnicalSkills}
        />
        <OptionalRadioForm
          name='athleticSkillsDescription'
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('anyAthleticSkills', value)
          }
          questionLabel='Do you Have any Athletic skills?'
          placeholder='Skill Description'
          answerState={personalDetailsState.anyAthleticSkills}
          value={personalDetailsState.athleticSkillsDescription}
          error={errors?.anyAthleticSkills}
        />
        <OptionalRadioForm
          name='totalNumberOfDependens'
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('anyDependents', value)}
          questionLabel='Do You Have Any Dependent?'
          placeholder='Total Number of Dependents'
          answerState={personalDetailsState.anyDependents}
          value={personalDetailsState.totalNumberOfDependens}
          error={errors?.anyDependents}
          checkRadio={personalDetailsState.anyDependents}
        />
      </div>

      <Input
        label='Beneficiary'
        placeholder='Name'
        onChange={handleFormInputs}
        name='beneficiaryName'
        value={personalDetailsState.beneficiaryName}
        required
        error={errors?.beneficiaryName}
      />

      <div className={classNames(row, double_input)}>
        <Input
          name='beneficiaryRelationship'
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryRelationship}
          placeholder='Relationship'
          error={errors?.beneficiaryRelationship}
        />
        <Input
          name='beneficiaryContactNumber'
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryContactNumber}
          placeholder='Contact Number'
          error={errors?.beneficiaryContactNumber}
        />
      </div>

      <div className={classNames(row, double_input)}>
        <Input
          label='Country'
          required
          disabled
          value={country.name}
          onChange={handleFormInputs}
          error={errors?.countryId}
        />
        <Select
          label='State'
          required
          currentOption={geoData.state}
          placeholder={
            states?.map(
              (stateInfo: Record<string, string>) => stateInfo.name
            )[0] || 'Choose State'
          }
          setCurrentOption={changeGeoStates}
          options={states.map(
            (stateInfo: Record<string, string>) => stateInfo.name
          )}
          error={errors?.stateId}
        />
      </div>

      <div className={classNames(row, double_input, margin_cont)}>
        <Select
          label='Cities'
          required
          disabled={cities.length === 0}
          currentOption={geoData.city}
          placeholder={
            cities.map(
              (cityInfo: Record<string, string>) => cityInfo.name
            )[0] || 'Choose city'
          }
          setCurrentOption={changeGeoCities}
          options={cities.map(
            (cityInfo: Record<string, string>) => cityInfo.name
          )}
          error={errors?.cityId}
        />
        <Input
          placeholder='Enter Zip Code'
          name='zipCode'
          label='Zip code'
          value={personalDetailsState.zipCode}
          onChange={handleFormInputs}
          required
          error={errors?.zipCode}
        />
      </div>
      {fetchError && typeof fetchError !== 'object' && (
        <ErrorsSpan>{fetchError}</ErrorsSpan>
      )}
      <div className={form_actions}>
        <div className={row}>
          <CheckBox
            label=''
            checked={termsAcceptance}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTermsAcceptance(e.target.checked)
            }
          />
          <LinkText href='#' secondary>
            Accept Terms and Conditions *
          </LinkText>
        </div>
        <div className={actions_buttons}>
          <Button onClick={handleForm} disabled={!termsAcceptance || fetching}>
            <>Continue</>
            <img src={vector} alt='vector' />
          </Button>
        </div>
      </div>
    </div>
  );
};
