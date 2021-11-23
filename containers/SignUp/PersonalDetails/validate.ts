export const validate = (formState: Record<string, any>) => {
  const errorObject = {} as { [key: string]: string }
  Object.keys(formState).foeEach((key) => (errorObject[key] = ''))

  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.maritalStatus))
    errorObject.maritalStatus = 'Field Required'
  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
  if (is.empty(formState.objective)) errorObject.objective = 'Field Required'
}

// objective: string                                              -                            Required
// objectiveNote: ''                                              - MaxSymbols: 512
// firstName: ''                                                  - MinSymbols:2 MaxSymbols:32 Required
// lastName: ''                                                   - MinSymbols:2 MaxSymbols:32 Required
// phone: ''                                                      - Only digits and + sign     Required
// address: ''                                                    - MaxSymbols: 255            Required
// gender: 'Male'                                                 -                            Required
// maritalStatus: ''                                              -                            Required
// сurrentlyEmployed: false                                       -                            Required
// jobTitle: 'Lord Commander'                                     -
// jobDescription: "Lord Commander of the Night's Watch"          -
// employeeAddress: 'The Wall and the Gift'                       -
// businessOwner: false                                           -                            Required
// businessDescription: 'Some business in Winterfell.'            -
// anyTrade: false                                                -                            Required
// tradeDescription: 'Some trade in Winterfell.'                  -
// anyTechnicalSkills: false                                      -                            Required
// technicalSkillsDescription: 'Some skills in leadership, etc.'  -
// anyAthleticSkills: false                                       -                            Required
// athleticSkillsDescription: 'Some skills in fight and so.'      -
// anyDependents: false                                           -                            Required
// totalNumberOfDependens: '2'                                    -
// beneficiaryName: 'Sansa Stark'                                 - MinSymbols:2 MaxSymbols:32 Required
// beneficiaryRelationship: 'Sister'                              - MinSymbols:2 MaxSymbols:32 Required
// beneficiaryContactNumber: '+18684978700'                       - MinSymbols:2 MaxSymbols:32 Required
// cityId: undefined                                              -                            Required
// stateId: undefined                                             -                            Required
// countryId: country.id                                          -                            Required
// zipCode: '1868'                                                -
// accountCurrency: 'BTC'                                         -
// accountAddress: '1BSsr1Ua6ucGGxV7UDmVj5FGDfpReZxh1z'           -
