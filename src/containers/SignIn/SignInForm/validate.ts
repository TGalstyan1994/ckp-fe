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

  if (is.empty(password)) errors.password = 'Password is required'

  return errors
}
