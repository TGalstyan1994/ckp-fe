import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsFormFilled } from '../../store/ProfileDataStore/ProfileDataStore'

import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import { ProfileManager } from '../../managers/profile'
import { modalPromise } from '../../helpers/modal-helper'
import {
  setShowPinModal,
  toggleAlertModal,
} from '../../store/MainLayoutDataStore/MainLayoutDataStore'
import { Input } from '../../components/Input'

export const Security: FC = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  })
  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    dispatch(setIsFormFilled(true))
  }

  useEffect(() => {
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])
  const resetValue = () => {
    setInputValue({
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    })
    dispatch(setIsFormFilled(false))
  }
  const onSubmit = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    const promise = await modalPromise(({ resolve, reject }) =>
      dispatch(setShowPinModal({ resolve, reject }))
    )
    if (promise) {
      try {
        await ProfileManager.changePassword({
          ...inputValue,
          securityCode: promise,
        })
        await dispatch(toggleAlertModal(true))
        resetValue()
      } catch (error) {
        throw error
      }
    }
  }

  return (
    <>
      <div className="content">
        <div className="input-container">
          <div className="input-label">Current Password</div>
          <Input
            name="oldPassword"
            value={inputValue.oldPassword}
            onChange={handleChange}
            placeholder="************"
            type="password"
          />
          <div className="input-label">New Password</div>
          <Input
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            placeholder="************"
            type="password"
          />
          <div className="input-label">Retype Password</div>
          <Input
            name="passwordConfirmation"
            value={inputValue.passwordConfirmation}
            onChange={handleChange}
            placeholder="************"
            type="password"
          />

          <div className="btn-container">
            <button onClick={resetValue} className="btn-cancel">
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className={isFormFilled ? 'btn-save' : 'btn-disable'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
