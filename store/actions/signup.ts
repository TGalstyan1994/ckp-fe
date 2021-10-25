import { RegistrationAction } from 'store'

type RegistrationBody = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  token: string
}

export const registerAction = ({
  username,
  email,
  password,
  passwordConfirmation,
  token,
}: RegistrationBody): RegistrationAction => {
  return {
    type: 'COMPLETE_STAGE',
    apiUrl: `/api/account/registration`,
    payload: {
      captcha: token,
      body: {
        username,
        email,
        password,
        passwordConfirmation,
      },
    },
  }
}
