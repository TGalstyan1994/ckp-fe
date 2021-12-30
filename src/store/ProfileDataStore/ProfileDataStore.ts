import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IProfileDataStore {
  activeTab: 'overview' | 'edit' | 'pin' | 'default'
  activeProfileTab: 'personal' | 'security' | 'social'
  toggleModal: boolean
  modalFrom: 'pin' | 'default' | 'security' | 'social'
  toggleCancelModal: boolean
  cancelFrom: 'social' | 'default' | 'security'
  isFormFilled: boolean
}

const initialState: IProfileDataStore = {
  activeTab: 'overview',
  activeProfileTab: 'personal',
  toggleModal: false,
  modalFrom: 'security',
  cancelFrom: 'security',
  toggleCancelModal: false,
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
    toggleModalOpen(state, action) {
      state.toggleModal = action.payload
    },
    toggleModalFrom(state, action) {
      state.modalFrom = action.payload
    },
    toggleCancelModalOpen(state, action) {
      state.toggleCancelModal = action.payload
    },
    cancelModalFrom(state, action) {
      state.cancelFrom = action.payload
    },
  },
})

export const {
  changeTab,
  changeProfileTab,
  toggleModalOpen,
  toggleModalFrom,
  cancelModalFrom,
  toggleCancelModalOpen,
  setIsFormFilled,
} = ProfileDataStore.actions

export default ProfileDataStore.reducer
