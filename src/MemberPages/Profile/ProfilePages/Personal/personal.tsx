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
import { MemberManagement } from 'src/managers/memberManagement'
import classNames from 'classnames'
import {
  job_question_inputs,
  row,
  row_employed,
} from '../../../../containers/SignUp/PersonalDetails/style.module.css'

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

  const [personalInfoState, setPersonalInfoState] = useState({
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
    currentlyEmployed: false,
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

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })

  const { href } = window.location
  const userId = href.slice(href.lastIndexOf('/') + 1)

  useEffect(() => {
    const body: { userId: number } = {
      userId: +userId,
    }

    ;(async () => {
      try {
        const res = await MemberManagement.getMemberPersonalInfo(body)
        setPersonalInfoState({
          ...personalInfoState,
          ...res,
        })

        if (!(res && res.dateOfBirth)) return

        const personalDateOfBirth = res.dateOfBirth?.split('-')
        const year = personalDateOfBirth && personalDateOfBirth[0]
        const month = personalDateOfBirth && +personalDateOfBirth[1] - 1
        const day = personalDateOfBirth && +personalDateOfBirth[2]

        setDateOfBirth({
          year,
          month: `${month}`,
          day: `${day}`,
        })
      } catch (error) {
        throw error
      }
    })()
  }, [userId])

  // verevy imna *************************

  const [geoData, setGeoData] = useState({
    state: '',
    country: '',
  })

  const dispatch = useDispatch()

  const removeErrors = (name: string) => {
    dispatch(validateStage({ errors: { [name]: '' } }))
  }

  const setPersonalDetails = (
    key: string,
    value: string | boolean | number
  ) => {
    setPersonalInfoState((prev) => ({ ...prev, [key]: value }))
  }

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

  // useEffect(() => {
  //   if (country.id < 0) return
  //   dispatch({
  //     type: 'GEO_TAKE',
  //     payload: { countryId: country.id, at: 'states' },
  //   })
  // }, [country.id])

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
              currentOption={objectiveCodes[personalInfoState.objective]}
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
            value={personalInfoState.objectiveNote}
            onChange={handleFormInputs}
            name="objectiveNote"
            label="Objective Note"
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="firstName"
                onChange={handleFormInputs}
                value={personalInfoState.firstName}
                label="First Name"
                required
                placeholder="Enter First Name"
              />
              <Input
                name="lastName"
                onChange={handleFormInputs}
                value={personalInfoState.lastName}
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
                genderState={personalInfoState.gender}
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
                maritalStatusCodes[personalInfoState.maritalStatus]
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
                  setPersonalDetails('currentlyEmployed', value)
                  removeErrors('jobTitle')
                  removeErrors('jobDescription')
                  removeErrors('employeeAddress')
                }}
                questionLabel="Are You Currently Employed?"
                placeholder="Job Title"
                answerState={personalInfoState.currentlyEmployed}
                value={personalInfoState.jobTitle}
                // error={fetchError?.currentlyEmployed}
                // inputError={fetchError?.jobTitle}
              />
            </div>
            {personalInfoState.currentlyEmployed && (
              <div
                className={classNames(row, job_question_inputs, row_employed)}
              >
                <Input
                  onChange={handleFormInputs}
                  name="jobDescription"
                  value={personalInfoState.jobDescription}
                  placeholder="Job Description"
                  // inputError={fetchError?.jobDescription}
                />
                <Input
                  onChange={handleFormInputs}
                  name="employeeAddress"
                  value={personalInfoState.employeeAddress}
                  placeholder="Employee Address"
                  // inputError={fetchError?.employeeAddress}
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
                answerState={personalInfoState.businessOwner}
                value={personalInfoState.businessDescription}
              />
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
                answerState={personalInfoState.anyTrade}
                value={personalInfoState.tradeDescription}
              />
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
                answerState={personalInfoState.anyTechnicalSkills}
                value={personalInfoState.technicalSkillsDescription}
              />
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
                answerState={personalInfoState.anyAthleticSkills}
                value={personalInfoState.athleticSkillsDescription}
              />
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
                answerState={personalInfoState.anyDependents}
                value={personalInfoState.totalNumberOfDependens}
              />
            </div>
          </div>

          <Input
            label="Beneficiary"
            placeholder="Name"
            onChange={handleFormInputs}
            name="beneficiaryName"
            value={personalInfoState.beneficiaryName}
            required
            className="mb-24"
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="address"
                onChange={handleFormInputs}
                value={personalInfoState.address}
                label="Address"
                required
                placeholder="Enter Address"
                // error={fetchError?.address}
                // maxLength={255}
              />
              <Input
                name="beneficiaryContactNumber"
                onChange={handleFormInputs}
                label="Mobile Phone"
                value={personalInfoState.beneficiaryContactNumber}
                placeholder="Contact Number"
                // error={fetchError?.beneficiaryContactNumber}
              />{' '}
            </div>
          </div>

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
                value={personalInfoState.city}
                onChange={handleFormInputs}
                required
                className="mb-24"
              />
              <Input
                placeholder="Enter Zip Code"
                name="zipCode"
                label="Zip code"
                value={personalInfoState.zipCode}
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
