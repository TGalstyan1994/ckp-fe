import is from 'is_js'

export const validate = (
  formState: Record<string, any>
): Record<string, string> => {
  const errorObject = {} as { [key: string]: string }
  Object.keys(formState).forEach((key) => (errorObject[key] = ''))

  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'

  if (is.empty(formState.maritalStatus))
    errorObject.maritalStatus = 'Field Required'

  if (formState.сurrentlyEmployed === undefined)
    errorObject.сurrentlyEmployed = 'Field Required'

  if (formState.businessOwner === undefined)
    errorObject.businessOwner = 'Field Required'

  if (formState.anyTrade === undefined) errorObject.anyTrade = 'Field Required'

  if (formState.anyTechnicalSkills === undefined)
    errorObject.anyTechnicalSkills = 'Field Required'

  if (formState.anyAthleticSkills === undefined)
    errorObject.anyAthleticSkills = 'Field Required'

  if (formState.anyDependents === undefined)
    errorObject.anyDependents = 'Field Required'

  if (formState.stateId === undefined) errorObject.cityId = 'Field Required'
  if (formState.cityId === undefined) errorObject.stateId = 'Field Required'

  if (is.empty(formState.phone))
    errorObject.phone = 'Field is required and should contain only digits'

  if (formState.address.length > 255 || is.empty(formState.address))
    errorObject.address = 'Field is required'

  if (
    formState.firstName.length < 2 ||
    formState.firstName.length > 32 ||
    is.empty(formState.firstName)
  )
    errorObject.firstName =
      'Field is required, min is 2 and max is 32 characters'
  if (
    formState.lastName.length < 2 ||
    formState.lastName.length > 32 ||
    is.empty(formState.lastName)
  )
    errorObject.lastName =
      'Field is required, min is 2 and max is 32 characters'
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
      'Field is required, min is 2 and max is 32 characters'

  if (Object.values(formState.dateOfBirth).every((value) => !value))
    errorObject.dateOfBirth = 'Field required'

  return errorObject
}

// objective: string                                              +                            Required
// objectiveNote: ''                                              + MaxSymbols: 512
// firstName: ''                                                  + MinSymbols:2 MaxSymbols:32 Required
// lastName: ''                                                   + MinSymbols:2 MaxSymbols:32 Required
// phone: ''                                                      + Only digits and + sign     Required
// address: ''                                                    + MaxSymbols: 255            Required
// gender: 'Male'                                                 +                            Required
// maritalStatus: ''                                              +                            Required
// сurrentlyEmployed: false                                       +                            Required
// jobTitle: 'Lord Commander'
// jobDescription: "Lord Commander of the Night's Watch"
// employeeAddress: 'The Wall and the Gift'
// businessOwner: false                                           +                            Required
// businessDescription: 'Some business in Winterfell.'
// anyTrade: false                                                +                            Required
// tradeDescription: 'Some trade in Winterfell.'
// anyTechnicalSkills: false                                      +                            Required
// technicalSkillsDescription: 'Some skills in leadership, etc.'
// anyAthleticSkills: false                                       +                            Required
// athleticSkillsDescription: 'Some skills in fight and so.'
// anyDependents: false                                           +                            Required
// totalNumberOfDependens: '2'
// beneficiaryName: 'Sansa Stark'                                 + MinSymbols:2 MaxSymbols:32 Required
// beneficiaryRelationship: 'Sister'                              + MinSymbols:2 MaxSymbols:32 Required
// beneficiaryContactNumber: '+18684978700'                       + MinSymbols:2 MaxSymbols:32 Required
// cityId: undefined                                              +                            Required
// stateId: undefined                                             +                            Required
// countryId: country.id                                          +                            Required
// zipCode: '1868'
// accountCurrency: 'BTC'
// accountAddress: '1BSsr1Ua6ucGGxV7UDmVj5FGDfpReZxh1z'
