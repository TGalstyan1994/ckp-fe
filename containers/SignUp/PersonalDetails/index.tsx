import { Select } from 'components/Select'
import { TextArea } from 'components/Textarea'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'utils/hooks'
import {
  // endStageFetching,
  startStageFetching,
  // validateStage,
} from 'store/reducers/signup'
// import { haveErrors } from 'utils'
import { PhoneNumberForm } from 'containers/PhoneNumberForm'
import { LinkText } from 'components/LinkText'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { DatePickerForm } from 'containers/DatePickerForm'
import classNames from 'classnames'
import { ChooseGenderForm } from 'containers/ChooseGenderForm'
import { OptionalRadioForm } from 'containers/OptionalRadioBoxForm'
import { CheckBox } from 'components/CheckBox'
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
} from './style.module.css'

export const PersonalDetails: FC = () => {
  const { errors } = useSelectorTyped((state) => state.signup.stages[3])
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
    сurrentlyEmployed: false,
    jobTitle: 'Lord Commander',
    jobDescription: "Lord Commander of the Night's Watch",
    employeeAddress: 'The Wall and the Gift',
    businessOwner: false,
    businessDescription: 'Some business in Winterfell.',
    anyTrade: false,
    tradeDescription: 'Some trade in Winterfell.',
    anyTechnicalSkills: false,
    technicalSkillsDescription: 'Some skills in leadership, etc.',
    anyAthleticSkills: false,
    athleticSkillsDescription: 'Some skills in fight and so.',
    anyDependents: false,
    totalNumberOfDependens: '2',
    beneficiaryName: 'Sansa Stark',
    beneficiaryRelationship: 'Sister',
    beneficiaryContactNumber: '+18684978700',
    cityId: undefined,
    stateId: undefined,
    countryId: country.id,
    zipCode: '1868',
    accountCurrency: 'BTC',
    accountAddress: '1BSsr1Ua6ucGGxV7UDmVj5FGDfpReZxh1z',
  })
  const [termsAcceptance, setTermsAcceptance] = useState(false)
  const [geoData, setGeoData] = useState({
    state: '',
    city: '',
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'GEO_TAKE',
      payload: { countryId: 1, at: 'states' },
    })
  }, [])

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
    }
    setGeoData((prev) => ({ ...prev, state: option, city: '' }))
  }
  const changeGeoCities = (option: string) =>
    setGeoData((prev) => ({ ...prev, city: option }))

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })

  const setPersonalDetails = (key: string, value: string | boolean) =>
    setPersonalDetailsState((prev) => ({ ...prev, [key]: value }))

  const handleForm = () => dispatch(startStageFetching())

  // const validationErrors = validate(personalDetailsState)
  // dispatch(validateStage({ errors: validationErrors }))

  // if (haveErrors(validationErrors)) {
  // dispatch(endStageFetching())
  // }

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
      />
      <div className={classNames(form_fullName, row)}>
        <Input
          name="firstName"
          onChange={handleFormInputs}
          value={personalDetailsState.firstName}
          label="First Name"
          required
          placeholder="Enter First Name"
          error={errors?.username}
        />
        <Input
          name="lastName"
          onChange={handleFormInputs}
          value={personalDetailsState.lastName}
          label="Last Name"
          required
          placeholder="Enter Last Name"
          error={errors?.username}
        />
      </div>
      <div className={classNames(form_phone_address, row)}>
        <PhoneNumberForm
          changeStateCallback={handleFormInputs}
          phoneCode={country.phonecode}
          formState={{
            phoneCode: country.phonecode,
            phoneNumber: personalDetailsState.phone,
          }}
          errors={{
            phoneCode: errors?.phoneCode,
            phoneNumber: errors?.phoneNumber,
          }}
        />

        <Input
          name="address"
          onChange={handleFormInputs}
          value={personalDetailsState.address}
          label="Address"
          required
          placeholder="Enter Address"
          error={errors?.username}
        />
      </div>

      <DatePickerForm dateForm={dateOfBirth} setDateForm={setDateOfBirth} />

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
          answerState={personalDetailsState.сurrentlyEmployed}
          value={personalDetailsState.jobTitle}
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
          answerState={personalDetailsState.businessOwner}
          value={personalDetailsState.businessDescription}
        />
        <OptionalRadioForm
          name="tradeDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('anyTrade', value)}
          questionLabel="Do You Have any Trade?"
          inputLabel="Trade Description"
          answerState={personalDetailsState.anyTrade}
          value={personalDetailsState.tradeDescription}
        />
        <OptionalRadioForm
          name="technicalSkillsDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('anyTechnicalSkills', value)
          }
          questionLabel="Do you Have any Technical skills?"
          inputLabel="Skill Description"
          answerState={personalDetailsState.anyTechnicalSkills}
          value={personalDetailsState.technicalSkillsDescription}
        />
        <OptionalRadioForm
          name="athleticSkillsDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) =>
            setPersonalDetails('anyAthleticSkills', value)
          }
          questionLabel="Do you Have any Athletic skills?"
          inputLabel="Skill Description"
          answerState={personalDetailsState.anyAthleticSkills}
          value={personalDetailsState.athleticSkillsDescription}
        />
        <OptionalRadioForm
          name="totalNumberOfDependens"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => setPersonalDetails('anyDependents', value)}
          questionLabel="Do You Have Any Dependent?"
          inputLabel="Total Number of Dependents"
          answerState={personalDetailsState.anyDependents}
          value={personalDetailsState.totalNumberOfDependens}
        />
      </div>

      <Input
        label="Beneficiary"
        placeholder="Name"
        onChange={handleFormInputs}
        name="beneficiaryName"
        value={personalDetailsState.beneficiaryName}
        required
      />

      <div className={classNames(row, double_input)}>
        <Input
          name="beneficiaryRelationship"
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryRelationship}
          placeholder="Relationship"
        />
        <Input
          name="beneficiaryContactNumber"
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryContactNumber}
          placeholder="Contact Number"
        />
      </div>

      <div className={classNames(row, double_input)}>
        <Input
          label="Country"
          required
          disabled
          value={country.name}
          onChange={handleFormInputs}
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
        />
      </div>

      <div className={classNames(row, double_input)}>
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
        />
        <Input
          placeholder="Enter Zip Code"
          name="zipCode"
          label="Zip code"
          required
          value={personalDetailsState.zipCode}
          onChange={handleFormInputs}
        />
      </div>

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
          <Button onClick={handleForm} disabled={!termsAcceptance}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
