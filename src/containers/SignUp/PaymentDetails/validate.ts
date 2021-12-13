import is from 'is_js'

export const validate = (
  formState: Record<string, any>
): Record<string, string> => {
  const errorObject = {} as { [key: string]: string }
  Object.keys(formState).forEach((key) => (errorObject[key] = ''))

  if (is.empty(formState.accountCurrency)) errorObject.accountCurrency = 'Field Required'
  if (is.empty(formState.accountAddress)) errorObject.accountAddress = 'Field Required'

  return errorObject
}