import { SignUpState } from 'store/reducers/signup'

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

// type Stage = {
//   number: number
//   title: string
//   finished: boolean
//   errors: Record<string, string>
//   fetchError: string
//   fetching: boolean
// }

// export type SignUpState = {
//   stages: Array<Stage>
//   currentStage: number
// }

export type StateType = {
  signup: SignUpState
}
