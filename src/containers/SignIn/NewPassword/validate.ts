import is from 'is_js'

type FormState = {
  newPass: string
  repeatPass: string
}
type ErrorsObject = FormState

export const validate = ({ newPass, repeatPass }: FormState): ErrorsObject => {
  const errors = {
    newPass: '',
    repeatPass: '',
  }

  if (is.empty(newPass)) {
    errors.newPass = 'Field is required'
  }

  if (!is.empty(newPass) && newPass.length < 2) {
    errors.newPass = 'Minimum length is 2 letters, digits'
  }

  if (newPass.length > 64)
    errors.newPass = 'The value must not be more than 64 characters long'

  if (is.empty(repeatPass)) errors.repeatPass = 'Field is required'

  if (newPass !== repeatPass) {
    errors.repeatPass = "Passwords don't match"
  }
  return errors
}
