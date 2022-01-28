import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IGlobalConfigDataStore {
  defaults: {
    currency: string
    language: string
  }
  isSuperAdmin: boolean
}

const initialState: IGlobalConfigDataStore = {
  defaults: {
    currency: '',
    language: '',
  },
  isSuperAdmin: false,
}

const GlobalConfigDataStore = createSlice({
  name: 'GlobalConfigDataStore',
  initialState,
  reducers: {
    setDefaults(state, action) {
      state.defaults = action.payload
    },
    setIsSuperAdmin(state, action) {
      state.isSuperAdmin = action.payload
    },
  },
})

export const { setDefaults, setIsSuperAdmin } = GlobalConfigDataStore.actions

export default GlobalConfigDataStore.reducer
