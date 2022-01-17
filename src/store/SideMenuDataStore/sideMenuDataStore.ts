import { createSlice } from '@reduxjs/toolkit'

interface ISideMenuDataStore {
  activePage:
    | 'dashboard'
    | 'universe'
    | 'donations'
    | 'academy'
    | 'communication'
    | 'support'
    | 'reports'
    | 'profile'
}
const initialState: ISideMenuDataStore = {
  activePage: 'dashboard',
}

const SideMenuDataStore = createSlice({
  name: 'SideMenuDataStore',
  initialState,
  reducers: {
    changePage(state, action) {
      state.activePage = action.payload
    },
  },
})
export const { changePage } = SideMenuDataStore.actions
