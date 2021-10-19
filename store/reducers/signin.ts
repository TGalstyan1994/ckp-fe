import { RootState, Action } from 'store'

const initialState = {}

export const signinReducer = (
  state: RootState = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case 'USER_FETCH_SUCCEEDED':
      return {
        ...state,
        ...action.payload,
      }
    case 'USER_FETCH_FAILED':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
  return state
}
