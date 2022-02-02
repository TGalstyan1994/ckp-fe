import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from '../../../../../components/Input'
import { Button } from '../../../../../components/Button'
import { toggleAlertModal } from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { setErrorMessage } from '../../../../../store/ProfileDataStore/ProfileDataStore'
import { setIsFormFilled } from '../../../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { MemberManagement } from '../../../../../managers/memberManagement'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import { validate } from './validate'
import { validatePin } from './validatePin'

export const Security: FC = () => {
  const [passwordValue, setPasswordValue] = useState({
    password: '',
    passwordConfirmation: '',
  })
  const [pinValue, setPinValue] = useState({
    securityCode: '',
    securityCodeRepeat: '',
  })
  const [passwordError, setPasswordError] = useState({
    password: '',
    passwordConfirmation: '',
  })
  const [pinError, setPinError] = useState({
    securityCode: '',
    securityCodeRepeat: '',
  })
  const { memberAccountInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const userId = memberAccountInfo.id

  const dispatch = useDispatch()

  const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError({ ...passwordError, [e.target.name]: '' })
    setPasswordValue({
      ...passwordValue,
      [e.target.name]: e.target.value.trim(),
    })
  }
  const changePinValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0 || e.target.value === '' || +e.target.value) {
      setPinError({
        ...pinError,
        [e.target.value]: '',
      })
      setPinValue({
        ...pinValue,
        [e.target.name]: e.target.value.trim(),
      })
    }
  }
  const resetPasswordValue = () => {
    setPasswordValue({
      password: '',
      passwordConfirmation: '',
    })
    setPasswordError({
      password: '',
      passwordConfirmation: '',
    })
    dispatch(setIsFormFilled(false))
  }
  const resetPinValue = () => {
    setPinValue({
      securityCode: '',
      securityCodeRepeat: '',
    })
    setPinError({
      securityCode: '',
      securityCodeRepeat: '',
    })
    dispatch(setIsFormFilled(false))
  }
  const onSavePassword = async () => {
    if (Object.values(passwordValue).every((name: string) => name === ''))
      return
    const validateForm = validate(passwordValue)
    setPasswordError({ ...validateForm })
    if (!Object.values(validateForm).every((name: string) => name === ''))
      return
    try {
      await MemberManagement.updatePassword({
        ...passwordValue,
        userId,
      })
      await dispatch(toggleAlertModal(true))
      resetPasswordValue()
    } catch (error: unknown | any) {
      const errors = error.data.errors[0]
      if (errors.property === 'password') {
        dispatch(setErrorMessage(errors.messages[0]))
        await onSavePassword()
      } else {
        setPasswordError({
          ...passwordError,
          [errors.property]: errors.messages[0],
        })
      }
    }
  }
  const onSavePin = async () => {
    if (Object.values(pinValue).every((name: string) => name === '')) return
    const validateFormPin = validatePin(pinValue)
    setPinError({ ...validateFormPin })
    if (!Object.values(validateFormPin).every((name: string) => name === ''))
      return
    try {
      await MemberManagement.updateSecurityPin({
        ...pinValue,
        userId,
      })
      await dispatch(toggleAlertModal(true))
      resetPinValue()
    } catch (error: unknown | any) {
      const errors = error.data.errors[0]
      if (errors.property === 'security') {
        dispatch(setErrorMessage(errors.messages[0]))
        await onSavePin()
      } else {
        setPinError({
          ...pinError,
          [errors.property]: errors.messages[0],
        })
      }
    }
  }
  useEffect(() => {
    dispatch(
      setIsFormFilled(
        !(
          Object.values(passwordValue).every((name: string) => name === '') &&
          Object.values(pinValue).every((name: string) => name === '')
        )
      )
    )
  }, [passwordValue, pinValue])

  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Change Password</span>
        </div>
        <div className="input-container">
          <div className="input-flex">
            <Input
              label="Password"
              name="password"
              placeholder="**************"
              value={passwordValue.password}
              onChange={changePasswordValue}
              error={passwordError.password}
            />
            <Input
              label="Confirm Password"
              name="passwordConfirmation"
              placeholder="**************"
              value={passwordValue.passwordConfirmation}
              onChange={changePasswordValue}
              error={passwordError.passwordConfirmation}
            />
          </div>
          <div className="mt-24" />
          <div className="w-140">
            <Button onClick={onSavePassword}>Save</Button>
          </div>
        </div>
      </div>
      <div className="mt-37" />
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Change Security PIN</span>
        </div>
        <div className="input-container">
          <div className="input-flex">
            <Input
              label="Security PIN"
              name="securityCode"
              placeholder="**************"
              value={pinValue.securityCode}
              onChange={changePinValue}
              error={pinError.securityCode}
            />
            <Input
              label="Confirm Security PIN"
              name="securityCodeRepeat"
              placeholder="**************"
              value={pinValue.securityCodeRepeat}
              onChange={changePinValue}
              error={pinError.securityCodeRepeat}
            />
          </div>
          <div className="mt-24" />
          <div className="w-140">
            <Button onClick={onSavePin}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
