import {
  configureStore,
  Store,
  AnyAction,
  combineReducers,
  Reducer,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import signin from './reducers/signin'
import signup from './reducers/signup'
import forgotPassword from './reducers/forgotpassword'
import newPassword from './reducers/newPassword'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  signin,
  signup,
  forgotPassword,
  newPassword,
}) as Reducer

export const store: Store<any, AnyAction> = configureStore({
  reducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type RegistrationAction = {
  type: string
  payload: Record<string, unknown>
  apiUrl: string
}

export type Action = {
  payload: Record<string, unknown>
  type: string
}
