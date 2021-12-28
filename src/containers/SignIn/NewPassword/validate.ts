import is from 'is_js'

type FormState = {
  password: string
  passwordConfirmation: string
}
type ErrorsObject = FormState

export const validate = ({
  password,
  passwordConfirmation,
}: FormState): ErrorsObject => {
  const errors = {
    password: '',
    passwordConfirmation: '',
  }

  if (is.empty(password)) {
    errors.password = 'Field is required'
  }

  if (!is.empty(password) && password.length < 2) {
    errors.password = 'Minimum length is 2 letters, digits'
  }

  if (password.length > 64)
    errors.password = 'The value must not be more than 64 characters long'

  if (is.empty(passwordConfirmation))
    errors.passwordConfirmation = 'Field is required'

  if (password !== passwordConfirmation) {
    errors.passwordConfirmation = "Passwords don't match"
  }
  return errors
}
