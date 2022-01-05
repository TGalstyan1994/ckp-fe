import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  toggleModalFrom,
  toggleModalOpen,
} from '../../store/ProfileDataStore/ProfileDataStore'

export const Pin: FC = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const dispatch = useDispatch()

  const toggleOpen = () => {
    dispatch(toggleModalOpen(true))
    dispatch(toggleModalFrom('pin'))
  }
  return (
    <div className="edit-container">
      <div className="sec-title">
        <span>CHANGE SECURITY PIN</span>
      </div>
      <hr />
      <div className="edit-holder">
        <div className="content">
          <div className="input-container">
            <label>Existing Pin</label>
            <input
              name="info"
              value={value}
              onChange={handleChange}
              placeholder="************"
            />
            <label>New Pin</label>
            <input
              name="facebook"
              value={value}
              onChange={handleChange}
              placeholder="************"
            />
            <label>Re type PIN</label>
            <input
              name="twitter"
              value={value}
              onChange={handleChange}
              placeholder="************"
            />

            <div className="btn-container">
              <button onClick={toggleOpen} className="btn-save">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
