import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMemberManagementDataStore {
  activeAdminTab:
    | 'profile'
    | 'donation'
    | 'kyc'
    | 'referral'
    | 'activate_deactivate'
  activeAdminProfileTab: 'account' | 'personal' | 'security' | 'social'
  count: number
  members: []
  memberAccountInfo: Record<string, unknown>
}

const initialState: IMemberManagementDataStore = {
  activeAdminTab: 'profile',
  activeAdminProfileTab: 'account',
  memberAccountInfo: {},
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
    setMemberAccountData(state, action) {
      state.memberAccountInfo = action.payload
    },
  },
})

export const {
  changeAdminTabs,
  changeAdminProfileTab,
  setPaginationCount,
  setMembers,
  setMemberAccountData
} = MemberManagementDataStore.actions

export default MemberManagementDataStore.reducer
