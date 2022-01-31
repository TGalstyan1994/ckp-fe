import { Select } from 'src/components/Select'
import { TextArea } from 'src/components/Textarea'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'src/utils/hooks'
import { validateStage } from 'src/store/reducers/signup'

import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'

import { DatePickerForm } from 'src/containers/DatePickerForm'
import { ChooseGenderForm } from 'src/containers/ChooseGenderForm'
import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm'

const maritalStatusCodes = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  DIVORCED: 'Divorced',
  COMMON_LAW: 'Common-law',
  WIDOW_WIDOWER: 'Widow/widower',
} as { [key: string]: string }

const objectiveCodes = {
  START_BUSINESS: 'Start a business',
  PROPERTY_PURCHASE: 'Buy income generating property',
  SECURE_COLLEGE_FUNDS: 'Secure college funds',
  HOME_OWNERSHIP: 'Home ownership',
  HEALTHCARE: 'Better health care',
  VACATION: 'Dream vacation',
  FURNISH: 'Furnish home',
  VEHICLE_PURCHASE: 'Buy new vehicle',
  OTHER: 'Other',
} as { [key: string]: string }

export const Personal: FC = () => {
  const { countries, country, states } = useSelectorTyped(
    (state) => state.signup.userInfo
  )
  const [personalDetailsState, setPersonalDetailsState] = useState({
    objective: '',
    objectiveNote: '',
    firstName: '',
    lastName: '',
    phone: '',
    phoneParsed: {
      country: '',
      phone: '',
    },
    address: '',
    gender: 'MALE',
    maritalStatus: '',
    dateOfBirth: '',
    сurrentlyEmployed: false,
    jobTitle: '',
    jobDescription: '',
    employeeAddress: '',
    businessOwner: false,
    businessDescription: '',
    anyTrade: false,
    tradeDescription: '',
    anyTechnicalSkills: false,
    technicalSkillsDescription: '',
    anyAthleticSkills: false,
    athleticSkillsDescription: '',
    anyDependents: false,
    totalNumberOfDependens: '',
    beneficiaryName: '',
    beneficiaryRelationship: '',
    beneficiaryContactNumber: '',
    city: '',
    stateId: undefined,
    countryId: undefined,
    zipCode: '',
  })

  const [geoData, setGeoData] = useState({
    state: '',
    country: '',
  })

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })

  const dispatch = useDispatch()

  const removeErrors = (name: string) => {
    dispatch(validateStage({ errors: { [name]: '' } }))
  }

  const setPersonalDetails = (
    key: string,
    value: string | boolean | number
  ) => {
    setPersonalDetailsState((prev) => ({ ...prev, [key]: value }))
  }

  //

  const changeGeoCountry = (option: string) => {
    const currentCountry = countries.find(
      (state: Record<string, string>) => state.name === option
    ) as { id: number; name: string } | undefined

    if (currentCountry) {
      dispatch({
        type: 'GEO_TAKE',
        payload: {
          countryId: currentCountry.id,
          at: 'states',
        },
      })
      setPersonalDetails('countryId', currentCountry.id)
    }
    setGeoData((prev) => ({ ...prev, country: option, state: '' }))
  }

  const changeGeoStates = (option: string) => {
    const currentState = states.find(
      (city: Record<string, string>) => city.name === option
    ) as { id: number; name: string } | undefined

    setGeoData((prev) => ({ ...prev, state: option }))
    if (currentState) setPersonalDetails('stateId', currentState.id)
    removeErrors('stateId')
  }

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'totalNumberOfDependens' && +e.target.value) {
      setPersonalDetails(e.target.name, +e.target.value)
    } else {
      setPersonalDetails(e.target.name, e.target.value)
    }
    removeErrors(e.target.name)
  }

  useEffect(() => {
    if (country.id < 0) return
    dispatch({
      type: 'GEO_TAKE',
      payload: { countryId: country.id, at: 'states' },
    })
  }, [country.id])
  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Basic info</span>
        </div>
        <div className="input-container">
          <Input
            name="email"
            onChange={handleFormInputs}
            label="Email"
            required
            placeholder="Start Your Business"
            className="mb-24"
          />
          <div className="personal-info">
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
              currentOption={objectiveCodes[personalDetailsState.objective]}
              placeholder="Select objective"
              setCurrentOption={(option: string) => {
                // eslint-disable-next-line no-restricted-syntax
                for (const item of Object.keys(objectiveCodes)) {
                  if (objectiveCodes[item] === option) {
                    setPersonalDetails('objective', item)
                    removeErrors('objective')
                  }
                }
              }}
            />
          </div>
          <TextArea
            value={personalDetailsState.objectiveNote}
            onChange={handleFormInputs}
            name="objectiveNote"
            label="Objective Note"
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="firstName"
                onChange={handleFormInputs}
                value={personalDetailsState.firstName}
                label="First Name"
                required
                placeholder="Enter First Name"
              />
              <Input
                name="lastName"
                onChange={handleFormInputs}
                value={personalDetailsState.lastName}
                label="Last Name"
                required
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="mt-24">
            <DatePickerForm
              dateForm={dateOfBirth}
              setDateForm={setDateOfBirth}
            />
          </div>
          <div className="martial-status">
            <div className="martial-gender">
              <ChooseGenderForm
                onGenderChange={setPersonalDetails}
                genderState={personalDetailsState.gender}
              />
            </div>
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
              currentOption={
                maritalStatusCodes[personalDetailsState.maritalStatus]
              }
              placeholder="Select marital status"
              setCurrentOption={(option: string) => {
                // eslint-disable-next-line array-callback-return
                Object.keys(maritalStatusCodes).map((item: string) => {
                  if (maritalStatusCodes[item] === option) {
                    setPersonalDetails('maritalStatus', item)
                    removeErrors('maritalStatus')
                  }
                })
              }}
            />
          </div>
          <div className="mt-35">
            <div className="member-flex">
              <OptionalRadioForm
                name="jobTitle"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalDetails('сurrentlyEmployed', value)
                  removeErrors('jobTitle')
                  removeErrors('jobDescription')
                  removeErrors('employeeAddress')
                }}
                questionLabel="Are You Currently Employed?"
                placeholder="Job Title"
                answerState={personalDetailsState.сurrentlyEmployed}
                value={personalDetailsState.jobTitle}
              />
            </div>
            {personalDetailsState.jobTitle && (
              <div className="member-input">
                <Input
                  onChange={handleFormInputs}
                  name="jobDescription"
                  value={personalDetailsState.jobDescription}
                  placeholder="Job Description"
                  className="mb-24"
                />
                <Input
                  onChange={handleFormInputs}
                  name="employeeAddress"
                  value={personalDetailsState.employeeAddress}
                  placeholder="Employee Address"
                  className="mb-24"
                />
              </div>
            )}
          </div>

          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="businessDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalDetails('businessOwner', value)
                  removeErrors('businessDescription')
                }}
                questionLabel="Are You a Business Owner?"
                placeholder="Business Description"
                answerState={personalDetailsState.businessOwner}
                value={personalDetailsState.businessDescription}
              />
            </div>

            <div className="member-input">
              {personalDetailsState.businessDescription && (
                <Input
                  onChange={handleFormInputs}
                  name="businessDescription"
                  value={personalDetailsState.businessDescription}
                  placeholder="Business Description"
                  className="mb-24"
                />
              )}
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="tradeDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalDetails('anyTrade', value)
                  removeErrors('tradeDescription')
                }}
                questionLabel="Do You Have any Trade?"
                placeholder="Trade Description"
                answerState={personalDetailsState.anyTrade}
                value={personalDetailsState.tradeDescription}
              />
            </div>

            <div className="member-input">
              {personalDetailsState.tradeDescription && (
                <Input
                  onChange={handleFormInputs}
                  name="tradeDescription"
                  value={personalDetailsState.tradeDescription}
                  placeholder="Trade Description"
                  className="mb-24"
                />
              )}
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="technicalSkillsDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalDetails('anyTechnicalSkills', value)
                  removeErrors('technicalSkillsDescription')
                }}
                questionLabel="Do you Have any Technical skills?"
                placeholder="Skill Description"
                answerState={personalDetailsState.anyTechnicalSkills}
                value={personalDetailsState.technicalSkillsDescription}
              />
            </div>

            <div className="member-input">
              {personalDetailsState.technicalSkillsDescription && (
                <Input
                  onChange={handleFormInputs}
                  name="technicalSkillsDescription"
                  value={personalDetailsState.technicalSkillsDescription}
                  placeholder="Skill Description"
                  className="mb-24"
                />
              )}
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="athleticSkillsDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalDetails('anyAthleticSkills', value)
                  removeErrors('athleticSkillsDescription')
                }}
                questionLabel="Do you Have any Athletic skills?"
                placeholder="Skill Description"
                answerState={personalDetailsState.anyAthleticSkills}
                value={personalDetailsState.athleticSkillsDescription}
              />
            </div>

            <div className="member-input">
              {personalDetailsState.athleticSkillsDescription && (
                <Input
                  onChange={handleFormInputs}
                  name="athleticSkillsDescription"
                  value={personalDetailsState.athleticSkillsDescription}
                  placeholder="Skill Description"
                  className="mb-24"
                />
              )}
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="totalNumberOfDependens"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalDetails('anyDependents', value)
                  removeErrors('totalNumberOfDependens')
                }}
                questionLabel="Do You Have Any Dependent?"
                placeholder="Total Number of Dependents"
                answerState={personalDetailsState.anyDependents}
                value={personalDetailsState.totalNumberOfDependens}
              />
            </div>

            <div className="member-input">
              {personalDetailsState.totalNumberOfDependens && (
                <Input
                  onChange={handleFormInputs}
                  name="totalNumberOfDependens"
                  value={personalDetailsState.totalNumberOfDependens}
                  placeholder="Total Number of Dependents"
                  className="mb-24"
                />
              )}
            </div>
          </div>

          <Input
            label="Beneficiary"
            placeholder="Name"
            onChange={handleFormInputs}
            name="beneficiaryName"
            value={personalDetailsState.beneficiaryName}
            required
            className="mb-24"
          />
          <div className="personal-info">
            <div className="state-flex">
              <Select
                label="Country"
                required
                currentOption={geoData.country}
                placeholder={
                  countries?.map(
                    (countryInfo: Record<string, string>) => countryInfo.name
                  )[0] || 'Choose Country'
                }
                setCurrentOption={changeGeoCountry}
                options={countries.map(
                  (stateInfo: Record<string, string>) => stateInfo.name
                )}
              />

              <Select
                label="State"
                required
                currentOption={geoData.state}
                placeholder="Select State"
                setCurrentOption={changeGeoStates}
                options={states.map(
                  (stateInfo: Record<string, string>) => stateInfo.name
                )}
              />
            </div>
            <div className="state-flex">
              <Input
                placeholder="Enter City"
                name="city"
                label="City"
                value={personalDetailsState.city}
                onChange={handleFormInputs}
                required
                className="mb-24"
              />
              <Input
                placeholder="Enter Zip Code"
                name="zipCode"
                label="Zip code"
                value={personalDetailsState.zipCode}
                onChange={handleFormInputs}
                className="mb-24"
              />
            </div>
          </div>
          <div className="mt-24">
            <div className="w-140">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
