import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMemberManagementDataStore {
  activeTab: 'profile' | 'donation' | 'kyc' | 'referral' | 'activate_deactivate'
  activeProfileTab: 'account' | 'personal' | 'security' | 'social'
  count: number
  members: []
  memberAccountInfo: Record<string, unknown>
}

const initialState: IMemberManagementDataStore = {
  activeTab: 'profile',
  activeProfileTab: 'account',
  memberAccountInfo: {},
  count: 0,
  members: [],
}

const MemberManagementDataStore = createSlice({
  name: 'MemberManagementDataStore',
  initialState,
  reducers: {
    changeTabs(state, action) {
      state.activeTab = action.payload
    },
    changeProfileTab(state, action) {
      state.activeProfileTab = action.payload
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
  changeTabs,
  changeProfileTab,
  setPaginationCount,
  setMembers,
  setMemberAccountData,
} = MemberManagementDataStore.actions

export default MemberManagementDataStore.reducer
