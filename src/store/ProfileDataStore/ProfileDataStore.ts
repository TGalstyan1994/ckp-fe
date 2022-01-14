import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IProfileDataStore {
  activeTab: 'overview' | 'edit' | 'pin' | 'default'
  activeProfileTab: 'personal' | 'security' | 'social'
  isFormFilled: boolean
}

const initialState: IProfileDataStore = {
  activeTab: 'overview',
  activeProfileTab: 'personal',
  isFormFilled: false,
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
  },
})

export const { changeTab, changeProfileTab, setIsFormFilled } =
  ProfileDataStore.actions

export default ProfileDataStore.reducer
