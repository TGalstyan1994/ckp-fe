import { RegistrationAction } from 'store'

type RegistrationBody = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  token: string
}

type SecurityQuestionState = {
  question: string
  answer: string
}

type PinFormState = {
  pin: string
  confirmPin: string
}

export const registerAction = ({
  username,
  email,
  password,
  passwordConfirmation,
  token,
}: RegistrationBody): RegistrationAction => ({
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
})

export const sendPinAction = ({
  pin: securityCode,
  confirmPin: securityCodeConfirmation,
}: PinFormState): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/security-code',
  payload: {
    securityCode,
    securityCodeConfirmation,
  },
})

export const sendSecurityQuestion = ({
  question,
  answer,
}: SecurityQuestionState): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/security-question',
  payload: {
    question,
    answer,
  },
})
