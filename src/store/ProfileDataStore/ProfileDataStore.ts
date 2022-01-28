import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IProfileDataStore {
  activeTab: 'overview' | 'edit' | 'pin' | 'default'
  activeProfileTab: 'personal' | 'security' | 'social'
  isFormFilled: boolean
  errorMessage: string
  socialInfo: {
    about?: string
    facebook?: string
    twitter?: string
    linkedIn?: string
  }
  accountInfo: Record<string, string>
}

const initialState: IProfileDataStore = {
  activeTab: 'overview',
  activeProfileTab: 'personal',
  isFormFilled: false,
  errorMessage: '',
  socialInfo: {
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  },
  accountInfo: {},
}

const ProfileDataStore = createSlice({
  name: 'ProfileDataStore',
  initialState,
  reducers: {
    changeTab(state, action) {
      state.activeTab = action.payload
    },
    changeProfileTab(state, action) {
      state.activeProfileTab = action.payload
    },
    setIsFormFilled(state, action) {
      state.isFormFilled = action.payload
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
    setSocialInfo(state, action) {
      state.socialInfo = action.payload
    },
    setAccountInfo(state, action) {
      state.accountInfo = action.payload
    },
    resetProfileDataStore() {
      return initialState
    },
  },
})

export const {
  changeTab,
  changeProfileTab,
  setIsFormFilled,
  setErrorMessage,
  setSocialInfo,
  setAccountInfo,
  resetProfileDataStore,
} = ProfileDataStore.actions

export default ProfileDataStore.reducer
