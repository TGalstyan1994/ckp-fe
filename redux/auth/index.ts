import { User } from "interfaces/index";
import { createSlice } from "@reduxjs/toolkit";
import { authorize, create } from "./thunks";

const initialState: User = {
  id: 0,
  accessToken: "",
  login: "",
  email: "",
  createdAt: "",
  updatedAt: "",
  roles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authorize.fulfilled, (state, action) => {
        if (!!action.payload.user) {
          const { user } = action.payload;

          console.log(action.payload);
          return {
            id: user.id,
            login: user.login,
            email: user.email,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken: action.payload.access_token,
          };
        }
      })
      .addCase(create.fulfilled, (state, action) => {
        if (!!action.payload.user) {
          const { user } = action.payload;
          return {
            id: user.id,
            login: user.login,
            email: user.email,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            accessToken: action.payload.access_token,
          };
        }
      });
  },
});

const { reducer } = authSlice;

export default reducer;
