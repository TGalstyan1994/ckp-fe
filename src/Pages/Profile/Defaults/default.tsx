import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleAlertModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { ProfileManager } from '../../../managers/profile'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import { setIsFormFilled } from '../../../store/ProfileDataStore/ProfileDataStore'

export const Default: FC = () => {
  const [inputValue, setInputValue] = useState({
    currency: '',
    language: '',
  })

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    dispatch(setIsFormFilled(true))
  }

  const resetValue = () => {
    setInputValue({
      currency: '',
      language: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSave = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    try {
      await ProfileManager.changeDefaults(inputValue)
      dispatch(toggleAlertModal(true))
      resetValue()
    } catch (error) {
      throw error
    }
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
            <div className="input-label">Set Default Language</div>
            <input
              type="text"
              name="language"
              value={inputValue.language.toLocaleUpperCase()}
              onChange={handleChange}
              placeholder="Select"
            />
            {/* <span className="error-span">{errorMessage}</span> */}
            <div className="input-label">Set Default Currency</div>
            <input
              type="text"
              name="currency"
              value={inputValue.currency.toLocaleUpperCase()}
              onChange={handleChange}
              placeholder="Select"
            />
            {/* <span className="error-span">{errorMessage}</span> */}
            <div className="btn-container">
              <button onClick={resetValue} className="btn-cancel">
                Cancel
              </button>
              <button
                onClick={onSave}
                className={isFormFilled ? 'btn-save' : 'btn-disable'}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
