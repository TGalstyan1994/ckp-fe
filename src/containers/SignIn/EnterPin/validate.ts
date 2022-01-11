import is from 'is_js'

type FormState = {
  pin: string
}

type ErrorObject = FormState

export const validate = ({ pin }: FormState): ErrorObject => {
  const errors = { pin: '' }

  if (is.empty(pin)) errors.pin = 'Pin is required'

  return errors
}
