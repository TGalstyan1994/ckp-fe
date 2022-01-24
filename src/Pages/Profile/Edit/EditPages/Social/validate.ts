type FormState = {
  about: string
  facebook: string
  twitter: string
  linkedIn: string
}
type ErrorsObject = FormState

export const validate = ({
  about,
  facebook,
  twitter,
  linkedIn,
}: FormState): ErrorsObject => {
  const errors = {
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  }

  if (about.length > 255) {
    errors.about = 'The value must not be more than 255 characters long'
  }

  return errors
}
