import {
  combineReducers,
  configureStore,
  Store,
  AnyAction,
} from '@reduxjs/toolkit';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store: Store<any, AnyAction> = configureStore({
  reducer: rootReducer,
});

export default store;
