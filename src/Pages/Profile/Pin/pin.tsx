import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setShowQuestionModal,
  toggleAlertModal,
} from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import { setIsFormFilled } from '../../../store/ProfileDataStore/ProfileDataStore'
import { modalPromise } from '../../../helpers/modal-helper'
import { ProfileManager } from '../../../managers/profile'
import { PinInput } from '../../../components/PinInput'
import { validate } from './validate'

export const Pin: FC = () => {
  const [inputValue, setInputValue] = useState({
    oldSecurityCode: '',
    securityCode: '',
    securityCodeRepeat: '',
  })
  const [inputError, setInputError] = useState({
    oldSecurityCode: '',
    securityCode: '',
    securityCodeRepeat: '',
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
      oldSecurityCode: '',
      securityCode: '',
      securityCodeRepeat: '',
    })
    setInputError({
      oldSecurityCode: '',
      securityCode: '',
      securityCodeRepeat: '',
    })
  }

  const onSave = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    const validateForm = validate(inputValue)
    setInputError({ ...validateForm })
    if (!Object.values(validateForm).every((name: string) => name === ''))
      return
    const promise = await modalPromise(({ resolve, reject }) =>
      dispatch(setShowQuestionModal({ resolve, reject }))
    )
    if (promise) {
      try {
        await ProfileManager.changeSecurityPin({
          ...inputValue,
          securityQuestionAnswer: promise,
        })
        dispatch(toggleAlertModal(true))
        resetValue()
      } catch (error) {
        throw error
      }
    }
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
            <div className="input-label">Existing Pin</div>
            <PinInput
              name="oldSecurityCode"
              value={inputValue.oldSecurityCode}
              onChange={handleChange}
            />
            <span className="error-span">{inputError.oldSecurityCode}</span>
            <div className="input-label">New Pin</div>
            <PinInput
              name="securityCode"
              value={inputValue.securityCode}
              onChange={handleChange}
            />
            <span className="error-span">{inputError.securityCode}</span>
            <div className="input-label">Re type PIN</div>
            <PinInput
              name="securityCodeRepeat"
              value={inputValue.securityCodeRepeat}
              onChange={handleChange}
            />
            <span className="error-span">{inputError.securityCodeRepeat}</span>
            <div className="btn-container">
              <button
                onClick={onSave}
                className={isFormFilled ? 'btn-save' : 'btn-disable'}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
