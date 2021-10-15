import {
  configureStore,
  // @ts-ignore
  combineReducers,
  // @ts-ignore
  Store,
  // @ts-ignore
  AnyAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { reducer } from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const store: Store<any, AnyAction> = configureStore({
  reducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type Action = {
  payload: any
  type: string
}
