import { Action } from '../index'

interface IFormState {
  username: string
  password: string
}
export const signInAction = ({ username, password }: IFormState): Action => ({
  type: 'LOGIN_USER',
  payload: {
    username,
    password,
  },
})
