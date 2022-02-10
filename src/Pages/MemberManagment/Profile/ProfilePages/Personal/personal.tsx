import { Select } from 'src/components/Select'
import { TextArea } from 'src/components/Textarea'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { haveErrors } from 'src/utils'

import { DatePickerForm } from 'src/containers/DatePickerForm'
import { ChooseGenderForm } from 'src/containers/ChooseGenderForm'
import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm'
import { MemberManagement } from 'src/managers/memberManagement'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { undef } from '@redux-saga/is'
import {
  job_question_inputs,
  row,
  row_employed,
} from '../../../../../containers/SignUp/PersonalDetails/style.module.css'
import { validate } from './validate'
import { setShowLoader } from '../../../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { toggleAlertModal } from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import { setMemberPersonalInfo } from '../../../../../store/MebmerManagementDataStore/MemberManagementDataStore'
import { ProfileManager } from '../../../../../managers/profile'
import { validateStage } from '../../../../../store/reducers/signup'

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

interface ICountries {
  id: number
  name: string
  phonecode: string
  phonemask: string
}

interface IStates {
  id: number
  name: string
}

export const Personal: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { userId } = router.query

  const userID = typeof userId === 'string' ? userId : userId[0]

  const { memberPersonalInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )

  const [countries, setCountries] = useState<Array<ICountries>>()
  const [states, setStates] = useState<Array<IStates>>()

  const [personalDataState, setPersonalDataState] = useState({
    email: '',
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
    gender: '',
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

  const [geoData, setGeoData] = useState({
    state: '',
    country: '',
  })

  const [inputError, setInputError] = useState<Record<string, string>>()

  const removeErrors = (name: string) => {
    setInputError({ ...inputError, [name]: '' })
  }

  // const removeError = (names: Array<string>) => {
  //   // eslint-disable-next-line unicorn/no-array-for-each
  //   const dd = names.forEach((name: string) => {
  //     console.log(name, 'fvdfvdfvdfvdfv')
  //     return setInputError({ ...inputError, [name]: '' })
  //   })
  //   console.log(dd)
  // }

  const setPersonalData = (key: string, value: string | boolean | number) => {
    setPersonalDataState((prev) => ({ ...prev, [key]: value }))
  }

  const changeGeoCountry = (option: string) => {
    const currentCountry = countries?.find(
      (state: ICountries) => state.name === option
    ) as { id: number; name: string } | undefined
    if (!currentCountry) return
    setPersonalData('countryId', currentCountry.id)
    removeErrors('countryId')
  }

  const changeGeoStates = (option: string) => {
    const currentState: IStates | undefined = states?.find(
      (state: IStates) => state.name === option
    ) as { id: number; name: string } | undefined
    if (!currentState) return
    setGeoData((prev) => ({ ...prev, state: option }))
    setPersonalData('stateId', currentState.id)
    removeErrors('stateId')
  }

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'totalNumberOfDependens' && +e.target.value) {
      setPersonalData(e.target.name, +e.target.value)
    } else {
      setPersonalData(e.target.name, e.target.value)
    }
    removeErrors(e.target.name)
  }

  const resetValue = () => {
    setPersonalDataState({ ...personalDataState, ...memberPersonalInfo })
  }

  const handleForm = async () => {
    try {
      await dispatch(setShowLoader(true))
      console.log('personalDataState', personalDataState)
      const validationErrors = validate({
        ...personalDataState,
        dateOfBirth,
      })

      const { phoneParsed, ...personalData } = personalDataState

      if (haveErrors(validationErrors)) {
        console.log('validationErrors', validationErrors)
        setInputError(validationErrors)
        dispatch(setShowLoader(false))
        return
      }
      dispatch(setShowLoader(false))

      //
      // const formData = {
      //   ...personalData,
      //   dateOfBirth: new Date(
      //     +dateOfBirth.year,
      //     +dateOfBirth.month,
      //     +dateOfBirth.day + 1
      //   )
      //     .toJSON()
      //     .slice(0, 10),
      // }
      // dispatch(setShowLoader(false))
      //
      // await MemberManagement.updateMemberPersonalInfo({
      //   ...formData,
      //   userId,
      // })
      // dispatch(setShowLoader(false))
      //
      // const res = await MemberManagement.getMemberPersonalInfo(userID)
      // dispatch(setMemberPersonalInfo(res))
      // dispatch(setShowLoader(false))
      // await dispatch(toggleAlertModal(true))
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    setPersonalDataState({ ...personalDataState, ...memberPersonalInfo })
  }, [memberPersonalInfo])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await MemberManagement.getMemberPersonalInfo(userID)
        setPersonalDataState({
          ...personalDataState,
          ...res,
        })
        if (!(res && res.dateOfBirth)) return

        // const [allCountry, allStates] = await Promise.all([
        //   MemberManagement.getMemberCountryInfo(),
        //   MemberManagement.getMemberStatesInfo(personalDataState.countryId),
        // ])

        // console.log(allCountry)
        // console.log(allStates)
        // setCountries(allCountry)
        // setStates(allStates)

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
  // console.log(personalDataState)
  // console.log('countries---', countries)
  // console.log('states--', states)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await MemberManagement.getMemberCountryInfo()
        setCountries(res)
      } catch (error) {
        throw error
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        // if (personalDataState.countryId) {
        const res = await MemberManagement.getMemberStatesInfo(
          personalDataState.countryId
        )
        // setGeoData({
        //   ...geoData,
        //   state: '',
        // })
        if (res.length === 0) return
        setStates(res)
        // }
      } catch (error) {
        throw error
      }
    })()
  }, [personalDataState.countryId])

  useEffect(() => {
    if (!countries) return
    const initialCountry: ICountries | undefined = countries.find(
      (item: ICountries) => item.id === personalDataState.countryId
    )
    setPersonalData('stateId')
    setGeoData({
      ...geoData,
      state: '',
      country: initialCountry?.name ?? '',
    })
  }, [countries, personalDataState.countryId])

  useEffect(() => {
    if (!states) return
    const initialStates: IStates | undefined = states.find(
      (item: IStates) => item.id === personalDataState.stateId
    )
    setGeoData({
      ...geoData,
      state: initialStates?.name ?? '',
    })
  }, [states])

  return (
    <div className="admin-info admin-info__personal">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Basic info</span>
        </div>
        <div className="input-container">
          <Input
            name="email"
            onChange={handleFormInputs}
            label="Email"
            value={personalDataState.email || ''}
            required
            placeholder="Start Your Business"
            className="mb-24"
            error={inputError?.email}
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
              error={inputError?.objective}
              currentOption={objectiveCodes[personalDataState.objective]}
              placeholder="Select objective"
              setCurrentOption={(option: string) => {
                // eslint-disable-next-line no-restricted-syntax
                for (const item of Object.keys(objectiveCodes)) {
                  if (objectiveCodes[item] === option) {
                    setPersonalData('objective', item)
                    removeErrors('objective')
                  }
                }
              }}
            />
          </div>
          <TextArea
            value={personalDataState.objectiveNote || ''}
            onChange={handleFormInputs}
            name="objectiveNote"
            label="Objective Note"
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="firstName"
                onChange={handleFormInputs}
                value={personalDataState.firstName || ''}
                label="First Name"
                required
                placeholder="Enter First Name"
                error={inputError?.firstName}
              />
              <Input
                name="lastName"
                onChange={handleFormInputs}
                value={personalDataState.lastName || ''}
                label="Last Name"
                required
                placeholder="Enter Last Name"
                error={inputError?.lastName}
              />
            </div>
          </div>
          <div className="mt-24">
            <DatePickerForm
              dateForm={dateOfBirth}
              setDateForm={setDateOfBirth}
              error={inputError?.dateOfBirth}
            />
          </div>
          <div className="martial-status">
            <div className="martial-gender">
              <ChooseGenderForm
                onGenderChange={setPersonalData}
                genderState={personalDataState.gender}
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
                maritalStatusCodes[personalDataState.maritalStatus]
              }
              placeholder="Select marital status"
              setCurrentOption={(option: string) => {
                // eslint-disable-next-line array-callback-return
                Object.keys(maritalStatusCodes).map((item: string) => {
                  if (maritalStatusCodes[item] === option) {
                    setPersonalData('maritalStatus', item)
                    removeErrors('maritalStatus')
                  }
                })
              }}
              error={inputError?.maritalStatus}
            />
          </div>
          <div className="mt-35">
            <div className="member-flex">
              <OptionalRadioForm
                name="jobTitle"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('currentlyEmployed', value)
                  removeErrors('jobTitle')
                  // removeError(['jobTitle', 'jobDescription', 'employeeAddress'])
                }}
                questionLabel="Are You Currently Employed?"
                placeholder="Job Title"
                answerState={personalDataState.currentlyEmployed}
                value={personalDataState.jobTitle || ''}
                error={inputError?.currentlyEmployed}
                inputError={inputError?.jobTitle}
              />
            </div>
            {personalDataState.currentlyEmployed && (
              <div
                className={classNames(row, job_question_inputs, row_employed)}
              >
                <Input
                  onChange={handleFormInputs}
                  name="jobDescription"
                  value={personalDataState.jobDescription || ''}
                  placeholder="Job Description"
                  inputError={inputError?.jobDescription}
                />
                <Input
                  onChange={handleFormInputs}
                  name="employeeAddress"
                  value={personalDataState.employeeAddress || ''}
                  placeholder="Employee Address"
                  inputError={inputError?.employeeAddress}
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
                  setPersonalData('businessOwner', value)
                  removeErrors('businessDescription')
                }}
                questionLabel="Are You a Business Owner?"
                placeholder="Business Description"
                answerState={personalDataState.businessOwner}
                value={personalDataState.businessDescription}
                error={inputError?.businessOwner}
                inputError={inputError?.businessDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="tradeDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyTrade', value)
                  // removeErrors('tradeDescription')
                }}
                questionLabel="Do You Have any Trade?"
                placeholder="Trade Description"
                answerState={personalDataState.anyTrade}
                value={personalDataState.tradeDescription}
                error={inputError?.anyTrade}
                inputError={inputError?.tradeDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="technicalSkillsDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyTechnicalSkills', value)
                  // removeErrors('technicalSkillsDescription')
                }}
                questionLabel="Do you Have any Technical skills?"
                placeholder="Skill Description"
                answerState={personalDataState.anyTechnicalSkills}
                value={personalDataState.technicalSkillsDescription}
                error={inputError?.anyTechnicalSkills}
                inputError={inputError?.technicalSkillsDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="athleticSkillsDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyAthleticSkills', value)
                  removeErrors('athleticSkillsDescription')
                }}
                questionLabel="Do you Have any Athletic skills?"
                placeholder="Skill Description"
                answerState={personalDataState.anyAthleticSkills}
                value={personalDataState.athleticSkillsDescription}
                error={inputError?.anyAthleticSkills}
                inputError={inputError?.athleticSkillsDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="totalNumberOfDependens"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyDependents', value)
                  removeErrors('totalNumberOfDependens')
                }}
                questionLabel="Do You Have Any Dependent?"
                placeholder="Total Number of Dependents"
                answerState={personalDataState.anyDependents}
                value={personalDataState.totalNumberOfDependens}
                error={inputError?.anyDependents}
                inputError={inputError?.totalNumberOfDependens}
              />
            </div>
          </div>

          <Input
            label="Beneficiary"
            placeholder="Name"
            onChange={handleFormInputs}
            name="beneficiaryName"
            value={personalDataState.beneficiaryName || ''}
            required
            className="mb-24"
            error={inputError?.beneficiaryName}
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="address"
                onChange={handleFormInputs}
                value={personalDataState.address || ''}
                label="Address"
                required
                placeholder="Enter Address"
                error={inputError?.address}
                // maxLength={255}
              />
              <Input
                name="phone"
                onChange={handleFormInputs}
                label="Mobile Phone"
                value={personalDataState.phone || ''}
                placeholder="Contact Number"
                error={inputError?.phone}
              />
            </div>
          </div>

          <div className="personal-info">
            <div className="state-flex">
              <Select
                label="Country"
                required
                currentOption={geoData.country}
                placeholder="Select Country"
                setCurrentOption={changeGeoCountry}
                options={
                  countries
                    ? countries.map((stateInfo: ICountries) => stateInfo.name)
                    : []
                }
                error={inputError?.countryId}
              />
              <Select
                label="State"
                required
                currentOption={geoData.state}
                placeholder="Select State"
                setCurrentOption={changeGeoStates}
                options={
                  states
                    ? states?.map((stateInfo: IStates) => stateInfo.name)
                    : []
                }
                error={inputError?.stateId}
              />
            </div>
            <div className="state-flex">
              <Input
                placeholder="Enter City"
                name="city"
                label="City"
                value={personalDataState.city || ''}
                onChange={handleFormInputs}
                required
                className="mb-24"
                error={inputError?.city}
              />
              <Input
                placeholder="Enter Zip Code"
                name="zipCode"
                label="Zip code"
                value={personalDataState.zipCode || ''}
                onChange={handleFormInputs}
                className="mb-24"
              />
            </div>
          </div>
          <div className="mt-24">
            <div className="w-140">
              <Button onClick={resetValue} className="btn-cancel">
                Cancel
              </Button>
              <Button onClick={handleForm}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
