import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMainLayoutDataStore {
  defaults: {
    currency: string
    language: string
  }
}

const initialState: IMainLayoutDataStore = {
  defaults: {
    currency: '',
    language: '',
  },
}

const GlobalConfigDataStore = createSlice({
  name: 'GlobalConfigDataStore',
  initialState,
  reducers: {
    setDefaults(state, action) {
      state.defaults = action.payload
    },
  },
})

export const { setDefaults } = GlobalConfigDataStore.actions

export default GlobalConfigDataStore.reducer
