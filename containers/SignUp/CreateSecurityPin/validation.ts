type FormState = {
  pin: string
  // pinConfirmation: string
}

type ErrorObject = FormState

export const validate = ({ pin }: FormState): ErrorObject => {
  const errors = { pin: '' }

  if (pin.length !== 6) errors.pin = "Security PIN can't be less then 6 digits"

  // if (errors.pin || pin !== pinConfirmation)
  // errors.pinConfirmation = 'Confirm Security PIN Mismatch'

  return errors
}
