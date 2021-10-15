import {
  configureStore,
  // @ts-ignore
  combineReducers,
  // @ts-ignore
  Store,
  // @ts-ignore
  AnyAction,
} from '@reduxjs/toolkit'
import authReducer from './auth'
import registrationReducer from './registration'

const rootReducer = combineReducers({
  auth: authReducer,
  registration: registrationReducer,
})

const store: Store<any, AnyAction> = configureStore({
  reducer: rootReducer,
})

export default store
