import {
  configureStore,
  combineReducers,
  Store,
  AnyAction,
} from '@reduxjs/toolkit';
import authReducer from './auth';
import registrationReducer from './registration';

const rootReducer = combineReducers({
  auth: authReducer,
  registration: registrationReducer,
});

const store: Store<any, AnyAction> = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
