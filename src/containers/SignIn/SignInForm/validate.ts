import is from 'is_js'

type FormState = {
  username: string
  password: string
}
type ErrorsObject = FormState

export const validate = ({ username, password }: FormState): ErrorsObject => {
  const errors = {
    username: '',
    password: '',
  }

  if (is.empty(username) || username.length < 2)
    errors.username = 'Username is required, minimum lengths 2 letters, digits'
  if (username.length > 32)
    errors.username = 'The value must not be more than 32 characters long'

  if (is.empty(password) || password.length < 2)
    errors.password = 'Password is required, minimum lengths 2 letters, digits'
  if (password.length > 64)
    errors.password = 'The value must not be more than 64 characters long'

  return errors
}
