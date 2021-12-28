import is from 'is_js'

type EmailFormState = string
type ErrorsObject = { email: EmailFormState }

export const validate = (email: EmailFormState): ErrorsObject => {
  const errors = {
    email: '',
  }

  const mailformat =
    /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i

  if (!mailformat.test(email)) {
    errors.email = 'Please enter valid email'
  }

  if (email.length < 2)
    errors.email = 'The value must be not less than 2 characters length'

  if (is.empty(email)) errors.email = 'Field required'

  return errors
}
