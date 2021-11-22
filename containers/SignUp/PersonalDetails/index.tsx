import { Select } from 'components/Select'
import { TextArea } from 'components/Textarea'
import { ChangeEvent, FC, useState } from 'react'
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
  row,
} from './style.module.css'

export const PersonalDetails: FC = () => {
  const { errors } = useSelectorTyped((state) => state.signup.stages[3])
  const { country } = useSelectorTyped((state) => state.signup.userInfo)
  const [personalDetailsState, setPersonalDetailsState] = useState({
    objective: '',
    objectiveNote: '',
    firstName: '',
    lastName: '',
    phoneCode: `+${country.phonecode}`,
    phoneNumber: '',
    Address: '',
    gender: 'Male',
    maritalStatus: '',
    //
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
  })

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })
  const dispatch = useDispatch()

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
            phoneCode: personalDetailsState.phoneCode,
            phoneNumber: personalDetailsState.phoneNumber,
          }}
          errors={{
            phoneCode: errors?.phoneCode,
            phoneNumber: errors?.phoneNumber,
          }}
        />

        <Input
          name="lastName"
          onChange={handleFormInputs}
          value={personalDetailsState.lastName}
          label="Username"
          required
          placeholder="Enter Last Name"
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
      <div className={form_actions}>
        <LinkText href="#">Accept Terms and Conditions *</LinkText>
        <div className={actions_buttons}>
          <Button secondary>Back</Button>
          <Button onClick={handleForm}>Continue</Button>
        </div>
      </div>
    </div>
  )
}
