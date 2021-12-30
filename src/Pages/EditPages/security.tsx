import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  toggleModalFrom,
  toggleModalOpen,
  setIsFormFilled,
} from '../../store/ProfileDataStore/ProfileDataStore'

export const Security: FC = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    currentPassword: '',
    newPassword: '',
    retypePassword: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])

  const openModal = () => {
    dispatch(toggleModalOpen(true))
    dispatch(toggleModalFrom('security'))
  }

  const resetValue = () => {
    setInputValue({
      currentPassword: '',
      newPassword: '',
      retypePassword: '',
    })
  }

  return (
    <>
      <div className="content">
        <div className="input-container">
          <label>Current Password</label>
          <input
            name="currentPassword"
            value={inputValue.currentPassword}
            onChange={handleChange}
            placeholder="************"
          />
          <label htmlFor="">New Password</label>
          <input
            name="newPassword"
            value={inputValue.newPassword}
            onChange={handleChange}
            placeholder="************"
          />
          <label>Retype Password</label>
          <input
            name="retypePassword"
            value={inputValue.retypePassword}
            onChange={handleChange}
            placeholder="************"
          />

          <div className="btn-container">
            <button onClick={() => resetValue()} className="btn-cancel">
              Cancel
            </button>
            <button onClick={openModal} className="btn-save">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
