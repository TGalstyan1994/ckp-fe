import { RootState, Action } from 'redux/index'

const initialState = {}

export const reducer = (state: RootState = initialState, action: Action) => {
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
  }
  return state
}
