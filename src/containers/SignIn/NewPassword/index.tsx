import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'src/utils/hooks'
import {
  startFetching,
  validateForm,
  resetError,
  stopFetching,
  setIsPinOpened,
  resetFetchingError,
} from 'src/store/reducers/newPassword'
import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { ErrorsSpan } from 'src/components/ErrorsSpan'
import { SignInLayout } from 'src/containers/Layouts/SignInLayout'
import { useRouter } from 'next/router'
import { validate } from './validate'
import { form, form_buttons } from './NewPasswordForm.module.css'
import { RootState } from '../../../store'
import { setNewPassword, verifyCode } from '../../../store/actions/newpassword'
import { PinInput } from '../../../components/PinInput'
import PasswordSuccessPopup from '../../../components/PopUps/password-succses-popup'

type FormState = {
  password: string
  passwordConfirmation: string
  securityCode: string
}

export const NewPasswordForm: FC = () => {
  const {
    errors,
    fetchingErrors,
    isCodeValid,
    isCodeChecked,
    isPinOpened,
    isPasswordChanged,
  } = useSelectorTyped((state: RootState) => state.newPassword)
  const dispatch = useDispatch()
  const router = useRouter()
  const [passwords, setPasswords] = useState<FormState>({
    password: '',
    passwordConfirmation: '',
    securityCode: '',
  })

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetError(e.target.name))
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }))
  }

  const validatePasswords = () => {
    dispatch(startFetching())
    const ValidationErrors = validate(passwords)
    dispatch(validateForm({ errors: ValidationErrors }))
    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(stopFetching())
    } else {
      dispatch(setIsPinOpened(true))
    }
  }

  const sendNewPassword = () => {
    dispatch(startFetching())
    const { code } = router.query
    if (!code) return
    const req = {
      body: {
        code,
        ...passwords,
      },
    }
    dispatch(resetFetchingError())
    dispatch(setNewPassword(req))
  }

  useEffect(() => {
    const { code } = router.query
    if (!code) return
    const req = {
      payload: {
        body: {
          code,
        },
      },
    }
    dispatch(verifyCode(req))
  }, [])

  return (
    <SignInLayout>
      {isCodeChecked &&
        (isCodeValid ? (
          <div className={form}>
            {!isPinOpened ? (
              <>
                <H1 secondary>Enter new password</H1>
                <Input
                  name="password"
                  placeholder="New password"
                  type="password"
                  value={passwords.password}
                  onChange={handleFormInputs}
                  error={errors.password}
                />
                <Input
                  name="passwordConfirmation"
                  onChange={handleFormInputs}
                  placeholder="Retype New password"
                  type="password"
                  value={passwords.passwordConfirmation}
                  error={errors.passwordConfirmation}
                />
                {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}
                <div className={form_buttons}>
                  <Button onClick={validatePasswords}>Continue</Button>
                </div>
              </>
            ) : (
              <>
                <H1 secondary>Enter your security PIN?</H1>
                <PinInput
                  onChange={handleFormInputs}
                  value={passwords.securityCode}
                  name="securityCode"
                />
                {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}
                <div className={form_buttons}>
                  <Button onClick={sendNewPassword}>Continue</Button>
                </div>
                {isPasswordChanged && <PasswordSuccessPopup />}
              </>
            )}
          </div>
        ) : (
          <div>Code is invalid</div>
        ))}
    </SignInLayout>
  )
}
