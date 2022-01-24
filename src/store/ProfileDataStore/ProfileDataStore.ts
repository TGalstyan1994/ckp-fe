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
  },
})

export const {
  changeTab,
  changeProfileTab,
  setIsFormFilled,
  setErrorMessage,
  setSocialInfo,
} = ProfileDataStore.actions

export default ProfileDataStore.reducer
