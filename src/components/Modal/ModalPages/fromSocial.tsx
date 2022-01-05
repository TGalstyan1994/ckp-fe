import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModalOpen } from '../../../store/ProfileDataStore/ProfileDataStore'

export const FromSocial: FC = () => {
  const dispatch = useDispatch()
  const toggleModal = () => {
    dispatch(toggleModalOpen(false))
  }
  return (
    <div className="modal">
      <div className="social-modal">
        <p>Your changes were successfully saved</p>
        <button onClick={toggleModal} className="btn-save">
          OK
        </button>
      </div>
    </div>
  )
}
