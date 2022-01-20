import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setErrorMessage,
  setIsFormFilled,
} from '../../../../../store/ProfileDataStore/ProfileDataStore'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import { ProfileManager } from '../../../../../managers/profile'
import { modalPromise } from '../../../../../helpers/modal-helper'
import {
  closePinModal,
  setShowPinModal,
  toggleAlertModal,
} from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { Input } from '../../../../../components/Input'
import { validate } from './validate'

export const Security: FC = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  })
  const [inputError, setInputError] = useState({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputError({ ...inputError, [e.target.name]: '' })
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
    setInputError({
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSubmit = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    const validateForm = validate(inputValue)
    setInputError({ ...validateForm })
    if (!Object.values(validateForm).every((name: string) => name === ''))
      return
    const promise = await modalPromise(({ resolve, reject }) =>
      dispatch(setShowPinModal({ resolve, reject }))
    )
    if (promise) {
      try {
        await ProfileManager.changePassword({
          ...inputValue,
          securityCode: promise,
        })
        dispatch(closePinModal())
        await dispatch(toggleAlertModal(true))
        resetValue()
      } catch (error: any) {
        const errors = error.data.errors[0]
        if (errors.property === 'securityCode') {
          dispatch(setErrorMessage(errors.messages[0]))
          await onSubmit()
        }
        setInputError({ ...inputError, [errors.property]: errors.messages[0] })
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
          <span className="error-span">{inputError.oldPassword}</span>
          <div className="input-label">New Password</div>
          <Input
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            placeholder="************"
            type="password"
          />
          <span className="error-span">{inputError.password}</span>
          <div className="input-label">Retype Password</div>
          <Input
            name="passwordConfirmation"
            value={inputValue.passwordConfirmation}
            onChange={handleChange}
            placeholder="************"
            type="password"
          />
          <span className="error-span">{inputError.passwordConfirmation}</span>
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
