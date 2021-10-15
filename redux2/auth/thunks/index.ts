import { authorizeUser, registerUser, createUser } from 'api/auth/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from 'interfaces/index';

export const authorize = createAsyncThunk(
  'auth/authorizeUser',
  async (user: UserAuthData) => {
    return authorizeUser(user.login, user.password);
  }
);

export const register = createAsyncThunk(
  'auth/registerUser',
  async (user: UserAuthData) => {
    return registerUser(user);
  }
);

export const create = createAsyncThunk(
  'auth/createUser',
  async (code: string) => {
    return createUser(code);
  }
);