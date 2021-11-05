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

export const sendPinAction = (securityCode: string): RegistrationAction => ({
  type: 'COMPLETE_STAGE',
  apiUrl: '/api/account/registration/security-code',
  payload: {
    securityCode,
    securityCodeConfirmation: securityCode,
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
