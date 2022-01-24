import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMainLayoutDataStore {
  promiseInfo: Record<string, unknown>
  showConfirmModal: boolean
  showAlertModal: boolean
  showPromptModal: boolean
  showPinModal: boolean
  showQuestionModal: boolean
  modalType: string
  userData: Record<string, unknown>
  defaults: {
    currency: string
    language: string
  }
}

const initialState: IMainLayoutDataStore = {
  promiseInfo: {},
  showConfirmModal: false,
  showAlertModal: false,
  showPromptModal: false,
  showPinModal: false,
  showQuestionModal: false,
  modalType: '',
  userData: {},
  defaults: {
    currency: '',
    language: '',
  },
}

const MainLayoutDataStore = createSlice({
  name: 'MainLayoutDataStore',
  initialState,
  reducers: {
    toggleAlertModal(state, action) {
      state.showAlertModal = action.payload
    },
    setShowPinModal(state, action) {
      state.showPinModal = true
      state.promiseInfo = action.payload
    },
    setShowQuestionModal(state, action) {
      state.showQuestionModal = true
      state.promiseInfo = action.payload
    },
    closeQuestionModal(state) {
      state.showQuestionModal = false
    },
    closePinModal(state) {
      state.showPinModal = false
    },
    closeModal(state) {
      state.showConfirmModal = false
    },
    setShowModal(state, action) {
      state.promiseInfo = action.payload
      state.showConfirmModal = true
    },
    setShowPropmtModal(state, action) {
      state.showPromptModal = action.payload
    },
    setUserData(state, action) {
      state.userData = action.payload
    },
    setDefaults(state, action) {
      state.defaults = action.payload
    },
  },
})

export const {
  toggleAlertModal,
  closeModal,
  setShowModal,
  setShowPropmtModal,
  setShowPinModal,
  closePinModal,
  setShowQuestionModal,
  closeQuestionModal,
  setUserData,
  setDefaults,
} = MainLayoutDataStore.actions

export default MainLayoutDataStore.reducer
