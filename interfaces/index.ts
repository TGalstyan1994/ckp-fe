import { SignUpState } from 'store/reducers/signup'
import { SignInState } from 'store/reducers/signin'

export interface UserData {
  access_token: string
  user: User
}

export interface User {
  id: number
  accessToken: string
  login: string
  email: string
  createdAt: string
  updatedAt: string
  roles: number[]
}

export type UserAuthData = {
  login: string
  email?: string
  password: string
}

export type StateType = {
  signup: SignUpState
  signin: SignInState
}
