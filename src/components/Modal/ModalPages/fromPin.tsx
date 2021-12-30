import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModalOpen } from '../../../store/ProfileDataStore/ProfileDataStore'
import ArrowNextIcon from '../../../assets/images/icons/arrow-next-icon'

export const FromPin: FC = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const dispatch = useDispatch()
  const toggleModal = () => {
    dispatch(toggleModalOpen(false))
  }
  return (
    <div className="fromPin">
      <div className="pin-modal">
        <p>Security Question</p>
        <span>Enter the name of your first pet*</span>
        <div>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="admin"
          />
          <button onClick={toggleModal} className="btn-save">
            CONTINUE
            <span>
              <ArrowNextIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
