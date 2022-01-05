import { createSlice } from 'node_modules/@reduxjs/toolkit/dist'

interface IMainLayoutDataStore {
  promiseInfo: Record<string, unknown>
  showModal: boolean
  modalType: string
}

const initialState: IMainLayoutDataStore = {
  promiseInfo: {},
  showModal: false,
  modalType: '',
}

const MainLayoutDataStore = createSlice({
  name: 'MainLayoutDataStore',
  initialState,
  reducers: {
    openModal(state, action) {
      state.showModal = true
      state.modalType = action.payload
    },
    closeModal(state) {
      state.showModal = false
    },
    setShowModal(state, action) {
      state.promiseInfo = action.payload
      state.showModal = true
    },
  },
})

export const { openModal, closeModal, setShowModal } =
  MainLayoutDataStore.actions

export default MainLayoutDataStore.reducer
