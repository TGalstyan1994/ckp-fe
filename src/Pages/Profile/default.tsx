import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  toggleModalFrom,
  toggleModalOpen,
} from '../../store/ProfileDataStore/ProfileDataStore'

export const Default: FC = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const dispatch = useDispatch()

  const toggleOpen = () => {
    dispatch(toggleModalOpen(true))
    dispatch(toggleModalFrom('default'))
  }

  const resetValue = () => {
    setValue('')
  }
  return (
    <div className="edit-container">
      <div className="sec-title">
        <span>SET DEFAULT LANGUAGE & CURRENCY</span>
      </div>
      <hr />
      <div className="edit-holder">
        <div className="content">
          <div className="input-container">
            <label>Set Default Language</label>
            <input
              type="select"
              name="language"
              value={value}
              onChange={handleChange}
              placeholder="Select"
            />
            <label>Set Default Currency</label>
            <input
              type="select"
              name="currency"
              value={value}
              onChange={handleChange}
              placeholder="Select"
            />

            <div className="btn-container">
              <button onClick={resetValue} className="btn-cancel">
                Cancel
              </button>
              <button onClick={toggleOpen} className="btn-save">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
