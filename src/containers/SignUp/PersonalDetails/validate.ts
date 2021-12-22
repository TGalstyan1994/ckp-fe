import is from 'is_js'

export const validate = (
  formState: Record<string, any>,
  phoneDate: Record<string, any>
): Record<string, string> => {
  const errorObject = {} as { [key: string]: string }
  for (const key of Object.keys(formState)) errorObject[key] = ''

  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.objectiveNote))
    errorObject.objectiveNote = 'Field Required'

  if (
    formState.firstName.length < 2 ||
    formState.firstName.length > 32 ||
    is.empty(formState.firstName)
  ) {
    errorObject.firstName =
      'Field is required, min is 2 and max is 32 characters'
  }
  if (
    formState.lastName.length < 2 ||
    formState.lastName.length > 32 ||
    is.empty(formState.lastName)
  ) {
    errorObject.lastName =
      'Field is required, min is 2 and max is 32 characters'
  }
  if (is.empty(phoneDate.phoneCode) || is.empty(phoneDate.phoneNumber))
    errorObject.phone = 'Field is required and should contain only digits'

  if (formState.address.length > 255 || is.empty(formState.address))
    errorObject.address = 'Field is required'

  if (Object.values(formState.dateOfBirth).every((value) => !value))
    errorObject.dateOfBirth = 'Field required'

  if (is.empty(formState.maritalStatus))
    errorObject.maritalStatus = 'Field Required'

  /// сurrentlyEmployed

  if (formState.сurrentlyEmployed === undefined)
    errorObject.сurrentlyEmployed = 'Field Required'

  if (formState.сurrentlyEmployed) {
    if (is.empty(formState.jobTitle)) errorObject.jobTitle = 'Field is required'

    if (is.empty(formState.jobDescription))
      errorObject.jobDescription = 'Field is required'

    if (is.empty(formState.employeeAddress))
      errorObject.employeeAddress = 'Field is required'
  }

  /// businessOwner

  if (formState.businessOwner === undefined)
    errorObject.businessOwner = 'Field Required'

  if (formState.businessOwner && is.empty(formState.businessDescription))
    errorObject.businessDescription = 'Field is required'

  /// anyTrade

  if (formState.anyTrade === undefined) errorObject.anyTrade = 'Field Required'
  if (formState.anyTrade && is.empty(formState.tradeDescription))
    errorObject.tradeDescription = 'Field is required'

  /// anyTechnicalSkills

  if (formState.anyTechnicalSkills === undefined)
    errorObject.anyTechnicalSkills = 'Field Required'

  if (
    formState.anyTechnicalSkills &&
    is.empty(formState.technicalSkillsDescription)
  )
    errorObject.technicalSkillsDescription = 'Field is required'

  /// anyAthleticSkills

  if (formState.anyAthleticSkills === undefined)
    errorObject.anyAthleticSkills = 'Field Required'

  if (
    formState.anyAthleticSkills &&
    is.empty(formState.athleticSkillsDescription)
  )
    errorObject.athleticSkillsDescription = 'Field is required'

  /// anyDependents

  if (formState.anyDependents === undefined)
    errorObject.anyDependents = 'Field Required and should contain only digits'

  if (formState.anyDependents && is.empty(formState.totalNumberOfDependens))
    errorObject.totalNumberOfDependens = 'Field is required '

  /// beneficiary

  if (
    formState.beneficiaryName.length < 2 ||
    formState.beneficiaryName.length > 32 ||
    is.empty(formState.beneficiaryName)
  )
    errorObject.beneficiaryName =
      'Field is required, min is 2 and max is 32 characters'

  if (
    formState.beneficiaryRelationship.length < 2 ||
    formState.beneficiaryRelationship.length > 32 ||
    is.empty(formState.beneficiaryRelationship)
  )
    errorObject.beneficiaryRelationship =
      'Field is required, min is 2 and max is 32 characters'

  if (
    formState.beneficiaryContactNumber.length < 2 ||
    formState.beneficiaryContactNumber.length > 32 ||
    is.empty(formState.beneficiaryContactNumber)
  )
    errorObject.beneficiaryContactNumber =
      'Field is required, min is 2 and max is 32 characters and should contain only digits '

  /// stateId  cityId

  if (formState.stateId === undefined) errorObject.cityId = 'Field Required'
  if (formState.cityId === undefined) errorObject.stateId = 'Field Required'

  /// zip code

  if (is.empty(formState.zipCode)) errorObject.zipCode = 'Field Required'

  return errorObject
}
