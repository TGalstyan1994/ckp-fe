import { Action } from 'store'

type FormState = {
  username: string
  password: string
}
export const signInAction = ({ username, password }: FormState): Action => ({
  type: 'LOGIN_USER',
  payload: {
    username,
    password,
  },
})
