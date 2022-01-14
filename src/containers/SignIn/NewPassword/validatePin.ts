import is from 'is_js'

type FormState = {
  securityCode: string
}

type ErrorObject = FormState

export const validatePin = ({ securityCode }: FormState): ErrorObject => {
  const errors = { securityCode: '' }

  if (!is.empty(securityCode) && securityCode.length < 6)
    errors.securityCode = "Security PIN can't be less then 6 digits"

  if (is.empty(securityCode)) {
    errors.securityCode = 'Field is required'
  }
  return errors
}
