import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

export type IActiveTab =
  | 'profile'
  | 'donation'
  | 'activate_deactivate'
  | 'kyc'
  | 'referral'

export type IActiveProfileTab = 'account' | 'security' | 'personal' | 'social'

interface IMemberManagementDataStore {
  activeTab: IActiveTab
  activeProfileTab: IActiveProfileTab
  count: number
  members: IMember[]
  memberAccountInfo: Record<string, unknown>
}

const initialState: IMemberManagementDataStore = {
  activeTab: 'profile',
  activeProfileTab: 'account',
  memberAccountInfo: {},
  count: 0,
  members: [],
}

export interface IMember {
  avatar: string
  blocked: boolean
  email: string
  firstName: string
  id: number
  kycStatus: string
  lastName: string
  phone: string
  status: string
  username: string
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
    resetMemberManagementDataStore() {
      return initialState
    },
  },
})

export const {
  changeTabs,
  changeProfileTab,
  setPaginationCount,
  setMembers,
  setMemberAccountData,
  resetMemberManagementDataStore,
} = MemberManagementDataStore.actions

export default MemberManagementDataStore.reducer
