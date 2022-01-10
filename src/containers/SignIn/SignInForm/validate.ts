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

  // username
  if (!is.email(username)) {
    if (username.length > 0 && username.length < 3)
      errors.username = 'Minimal amount of characters is not reached'

    if (is.empty(username)) errors.username = 'Email/Username is required'

    if (username.length > 32)
      errors.username = 'The value must not be more than 32 characters long'
  }

  // password
  if (password.length > 0 && password.length < 2)
    errors.password = 'Minimal amount of characters is not reached'
  if (is.empty(password)) errors.password = 'Password is required'
  if (password.length > 64)
    errors.password = 'The value must not be more than 64 characters long'

  return errors
}
