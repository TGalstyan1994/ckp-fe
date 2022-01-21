import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleAlertModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { ProfileManager } from '../../../managers/profile'
import { setIsFormFilled } from '../../../store/ProfileDataStore/ProfileDataStore'

import { Input } from '../../../components/Input'

export const Default: FC = () => {
  const [inputValue, setInputValue] = useState({
    currency: '',
    language: '',
  })
  const [inputError, setInputError] = useState({
    currency: '',
    language: '',
  })
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    setInputError({
      currency: '',
      language: '',
    })
    dispatch(setIsFormFilled(true))
  }

  const resetValue = () => {
    setInputValue({
      currency: '',
      language: '',
    })
    setInputError({
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
    } catch (error: any) {
      throw error
    }
  }
  const isFormFilled = () => {
    return Object.values(inputValue).every((val: string) => val)
  }

  useEffect(() => {
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])
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
            <Input
              type="text"
              name="language"
              value={inputValue.language.toLocaleUpperCase()}
              onChange={handleChange}
              placeholder="Select"
              error={inputError.language}
            />

            <div className="input-label">Set Default Currency</div>
            <Input
              type="text"
              name="currency"
              value={inputValue.currency.toLocaleUpperCase()}
              onChange={handleChange}
              placeholder="Select"
              error={inputError.currency}
            />
            <div className="btn-container">
              <button onClick={resetValue} className="btn-cancel">
                Cancel
              </button>
              <button
                onClick={onSave}
                className={isFormFilled() ? 'btn-save' : 'btn-disable'}
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
