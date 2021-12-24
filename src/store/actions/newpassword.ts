import { Action } from '../index'

interface INewPassword {
  body: {
    password: string
    passwordConfirmation: string
  }
}

export const setNewPassword = ({ body }: INewPassword): Action => ({
  type: 'SET_NEW_PASSWORD',
  payload: { body },
})

// export const validateCode = ({ c }: INewPassword): Action => ({
//   type: 'SET_NEW_PASSWORD',
//   payload: { body },
// })
