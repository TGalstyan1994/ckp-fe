import { Select } from 'components/Select'
import { TextArea } from 'components/Textarea'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'utils/hooks'
import {
  endStageFetching,
  startStageFetching,
  validateStage,
} from 'store/reducers/signup'
import { haveErrors } from 'utils'
import { PhoneNumberForm } from 'containers/PhoneNumberForm'
import { LinkText } from 'components/LinkText'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { sendPersonalDetails } from 'store/actions/signup'
import { DatePickerForm } from 'containers/DatePickerForm'
import classNames from 'classnames'
import { ChooseGenderForm } from 'containers/ChooseGenderForm'
import { OptionalRadioForm } from 'containers/OptionalRadioBoxForm'
import { CheckBox } from 'components/CheckBox'
import { ErrorsSpan } from 'components/ErrorsSpan'
import { H1 } from 'components/H1'
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
} from './style.module.css'
import { validate } from './validate'

const maritalStatusCodes = {
  'Single': 'SINGLE',
  'Married': 'MARRIED',
  'Divorced': 'DIVORCED',
  'Common-law': 'COMMON_LAW',
  'Widow/widower': 'WIDOW_WIDOWER',
} as { [key: string]: string }

const objectiveCodes = {
  'Start a business': 'START_BUSINESS',
  'Buy income generating property': 'PROPERTY_PURCHASE',
  'Secure college funds': 'SECURE_COLLEGE_FUNDS',
  'Home ownership': 'HOME_OWNERSHIP',
  'Better health care': 'HEALTHCARE',
  'Dream vacation': 'VACATION',
  'Furnish home': 'FURNISH',
  'Buy new vehicle': 'VEHICLE_PURCHASE',
  'Other': 'OTHER',
} as { [key: string]: string }

const genderCodes = {
  Male: 'MALE',
  Female: 'FEMALE',
  Other: 'OTHER',
} as { [key: string]: string }

export const PersonalDetails: FC = () => {
  const { errors, fetching, fetchError } = useSelectorTyped(
    (state) => state.signup.stages[3]
  )
  const { country, states, cities } = useSelectorTyped(
    (state) => state.signup.userInfo
  )

  const [personalDetailsState, setPersonalDetailsState] = useState({
    objective: '',
    objectiveNote: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: 'Male',
    maritalStatus: '',
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
    zipCode: '',
    accountCurrency: 'BTC',
    accountAddress: '1BSsr1Ua6ucGGxV7UDmVj5FGDfpReZxh1z',
  })
  const [termsAcceptance, setTermsAcceptance] = useState(false)
  const [geoData, setGeoData] = useState({
    state: '',
    city: '',
  })
  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })
  const [phoneState, setPhoneState] = useState({
    phoneCode: '',
    phoneNumber: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'GEO_TAKE',
      payload: { countryId: 1, at: 'states' },
    })
  }, [])

  const setPersonalDetails = (key: string, value: string | boolean | number) =>
    setPersonalDetailsState((prev) => ({ ...prev, [key]: value }))

  const changePhoneState = (value: string, name: string) =>
    setPhoneState((prev) => ({ ...prev, [name]: value }))

  const changeGeoStates = (option: string) => {
    const currentState = states.find(
      (state: Record<string, string>) => state.name === option
    ) as { id: number; name: string } | undefined

    if (currentState) {
      dispatch({
        type: 'GEO_TAKE',
        payload: {
          stateId: currentState.id,
          at: 'cities',
        },
      })
      setPersonalDetails('stateId', currentState.id)
    }
    setGeoData((prev) => ({ ...prev, state: option, city: '' }))
  }

  const changeGeoCities = (option: string) => {
    const currentCity = cities.find(
      (city: Record<string, string>) => city.name === option
    ) as { id: number; name: string } | undefined

    setGeoData((prev) => ({ ...prev, city: option }))
    if (currentCity) setPersonalDetails('cityId', currentCity.id)
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    const validationErrors = validate({
      ...personalDetailsState,
      dateOfBirth,
      phone: `${phoneState.phoneCode}${phoneState.phoneNumber}`,
    })
    dispatch(validateStage({ errors: validationErrors }))

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching())
      return
    }

    const currentFormState = {
      ...personalDetailsState,
      phone: `+${phoneState.phoneCode}${phoneState.phoneNumber}`,
      maritalStatus: maritalStatusCodes[personalDetailsState.maritalStatus],
      objective: objectiveCodes[personalDetailsState.objective],
      gender: genderCodes[personalDetailsState.gender],
      dateOfBirth: new Date(
        +dateOfBirth.year,
        +dateOfBirth.month,
        +dateOfBirth.day + 1
      )
        .toJSON()
        .slice(0, 10),
    }

    dispatch(sendPersonalDetails(currentFormState))
  }

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => setPersonalDetails(e.target.name, e.target.value)

  return (
    <div className={form}>
      <H1 secondary>Personal Details</H1>

      <Select
        label="Objective"
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
        error={errors?.objective}
        currentOption={personalDetailsState.objective}
        placeholder="Start a Business"
        setCurrentOption={(option: string) =>
          setPersonalDetails('objective', option)
        }
      />

      <TextArea
        value={personalDetailsState.objectiveNote}
        onChange={handleFormInputs}
        name="objectiveNote"
        label="Objective Note"
        required
        maxSymbols={512}
      />

      <div className={classNames(form_fullName, row)}>
        <Input
          name="firstName"
          onChange={handleFormInputs}
          value={personalDetailsState.firstName}
          label="First Name"
          required
          placeholder="Enter First Name"
          error={errors?.firstName}
        />
        <Input
          name="lastName"
          onChange={handleFormInputs}
          value={personalDetailsState.lastName}
          label="Last Name"
          required
          placeholder="Enter Last Name"
          error={errors?.lastName}
        />
      </div>

      <div className={classNames(form_phone_address, row)}>
        <PhoneNumberForm
          changeStateCallback={changePhoneState}
          phoneCode={country.phonecode}
          formState={{
            phoneCode: phoneState.phoneCode,
            phoneNumber: phoneState.phoneNumber,
          }}
          error={errors?.phone}
        />

        <Input
          name="address"
          onChange={handleFormInputs}
          value={personalDetailsState.address}
          label="Address"
          required
          placeholder="Enter Address"
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
            label="Marital Status"
            required
            options={[
              'Single',
              'Married',
              'Divorced',
              'Common-law',
              'Widow/widower',
            ]}
            currentOption={personalDetailsState.maritalStatus}
            placeholder="Marital Status"
            setCurrentOption={(option: string) =>
              setPersonalDetails('maritalStatus', option)
            }
            error={errors?.maritalStatus}
          />
        </div>
      </div>
      <div className={options_wrapper}>
        <OptionalRadioForm
          name="jobTitle"
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('сurrentlyEmployed', value)
          }
          questionLabel="Are You Currently Employed?"
          inputLabel="Job Title"
          answerState={personalDetailsState.сurrentlyEmployed ?? false}
          value={personalDetailsState.jobTitle}
          error={errors?.сurrentlyEmployed}
        />
        {personalDetailsState.сurrentlyEmployed && (
          <div className={classNames(row, job_question_inputs)}>
            <Input
              onChange={handleFormInputs}
              name="jobDescription"
              value={personalDetailsState.jobDescription}
              label="Job Description"
            />
            <Input
              onChange={handleFormInputs}
              name="employeeAddress"
              value={personalDetailsState.employeeAddress}
              label="Employee Address"
            />
          </div>
        )}

        <OptionalRadioForm
          name="businessDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('businessOwner', value)}
          questionLabel="Are You a Business Owner?"
          inputLabel="Business Description"
          answerState={personalDetailsState.businessOwner ?? false}
          value={personalDetailsState.businessDescription}
          error={errors?.businessOwner}
        />
        <OptionalRadioForm
          name="tradeDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('anyTrade', value)}
          questionLabel="Do You Have any Trade?"
          inputLabel="Trade Description"
          answerState={personalDetailsState.anyTrade ?? false}
          value={personalDetailsState.tradeDescription}
          error={errors?.anyTrade}
        />
        <OptionalRadioForm
          name="technicalSkillsDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('anyTechnicalSkills', value)
          }
          questionLabel="Do you Have any Technical skills?"
          inputLabel="Skill Description"
          answerState={personalDetailsState.anyTechnicalSkills ?? false}
          value={personalDetailsState.technicalSkillsDescription}
          error={errors?.anyTechnicalSkills}
        />
        <OptionalRadioForm
          name="athleticSkillsDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('anyAthleticSkills', value)
          }
          questionLabel="Do you Have any Athletic skills?"
          inputLabel="Skill Description"
          answerState={personalDetailsState.anyAthleticSkills ?? false}
          value={personalDetailsState.athleticSkillsDescription}
          error={errors?.anyAthleticSkills}
        />
        <OptionalRadioForm
          name="totalNumberOfDependens"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('anyDependents', value)}
          questionLabel="Do You Have Any Dependent?"
          inputLabel="Total Number of Dependents"
          answerState={personalDetailsState.anyDependents ?? false}
          value={personalDetailsState.totalNumberOfDependens}
          error={errors?.anyDependents}
        />
      </div>

      <Input
        label="Beneficiary"
        placeholder="Name"
        onChange={handleFormInputs}
        name="beneficiaryName"
        value={personalDetailsState.beneficiaryName}
        required
        error={errors?.beneficiaryName}
      />

      <div className={classNames(row, double_input)}>
        <Input
          name="beneficiaryRelationship"
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryRelationship}
          placeholder="Relationship"
          error={errors?.beneficiaryRelationship}
        />
        <Input
          name="beneficiaryContactNumber"
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryContactNumber}
          placeholder="Contact Number"
          error={errors?.beneficiaryContactNumber}
        />
      </div>

      <div className={classNames(row, double_input)}>
        <Input
          label="Country"
          required
          disabled
          value={country.name}
          onChange={handleFormInputs}
          error={errors?.countryId}
        />
        <Select
          label="State"
          required
          currentOption={geoData.state}
          placeholder={
            states.map(
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
          label="Cities"
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
          placeholder="Enter Zip Code"
          name="zipCode"
          label="Zip code"
          value={personalDetailsState.zipCode}
          onChange={handleFormInputs}
        />
      </div>
      {fetchError && typeof fetchError !== 'object' && (
        <ErrorsSpan>{fetchError}</ErrorsSpan>
      )}
      <div className={form_actions}>
        <div className={row}>
          <CheckBox
            label=""
            checked={termsAcceptance}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTermsAcceptance(e.target.checked)
            }
          />
          <LinkText href="#" secondary>
            Accept Terms and Conditions *
          </LinkText>
        </div>
        <div className={actions_buttons}>
          <Button secondary>Back</Button>
          <Button onClick={handleForm} disabled={!termsAcceptance || fetching}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
