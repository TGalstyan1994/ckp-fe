import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMemberManagementDataStore {
  activeAdminTab:
    | 'profile'
    | 'donation'
    | 'kyc'
    | 'referral'
    | 'activate_deactivate'
  activeAdminProfileTab: 'personal' | 'security' | 'social'
  count: number
  members: []
}

const initialState: IMemberManagementDataStore = {
  activeAdminTab: 'profile',
  activeAdminProfileTab: 'personal',
  count: 0,
  members: [],
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
    setPaginationCount(state, action) {
      state.count = action.payload
    },
    setMembers(state, action) {
      state.members = action.payload
    },
  },
})

export const {
  changeAdminTabs,
  changeAdminProfileTab,
  setPaginationCount,
  setMembers,
} = MemberManagementDataStore.actions

export default MemberManagementDataStore.reducer
