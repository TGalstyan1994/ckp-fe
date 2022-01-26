import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMemberManagementDataStore {
  activeAdminTab:
    | 'profile'
    | 'donation'
    | 'kyc'
    | 'referral'
    | 'activate_deactivate'
  activeAdminProfileTab: 'personal' | 'security' | 'social'
}

const initialState: IMemberManagementDataStore = {
  activeAdminTab: 'profile',
  activeAdminProfileTab: 'personal',
}

const MemberManagementDataStore = createSlice({
  name: 'MemberManagementDataStore',
  initialState,
  reducers: {
    changeAdminTabs(state, action) {
      state.activeAdminTab = action.payload
    },
    changeAdminProfileTab(state, action) {
      state.activeAdminProfileTab = action.payload
    },
  },
})

export const { changeAdminTabs, changeAdminProfileTab } =
  MemberManagementDataStore.actions

export default MemberManagementDataStore.reducer
