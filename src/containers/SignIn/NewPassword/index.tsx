import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'src/utils/hooks'
import {
  startFetching,
  validateForm,
  resetError,
  stopFetching,
} from 'src/store/reducers/newPassword'

import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { ErrorsSpan } from 'src/components/ErrorsSpan'
import { SignInLayout } from 'src/containers/Layouts/SignInLayout'

import { setNewPassword } from 'src/store/actions/newpassword'
import { validate } from './validate'
import { form, form_buttons } from './NewPasswordForm.module.css'
import { RootState } from '../../../store'

type FormState = {
  newPass: string
  repeatPass: string
}

export const NewPasswordForm: FC = () => {
  const { errors, fetchingErrors, data } = useSelectorTyped(
    (state: RootState) => state.newPassword
  )
  const dispatch = useDispatch()

  const [passwords, setPasswords] = useState<FormState>({
    newPass: '',
    repeatPass: '',
  })

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetError(e.target.name))
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }))
  }

  const sendNewPassword = () => {
    dispatch(startFetching())
    const ValidationErrors = validate(passwords)
    dispatch(validateForm({ errors: ValidationErrors }))
    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(stopFetching())
    }
    // dispatch(setNewPassword(passwords))
  }

  // useEffect(() => {
  //   dispatch()
  // }, [])

  return (
    <SignInLayout>
      <div className={form}>
        <H1 secondary>Enter new password</H1>
        <Input
          name="newPass"
          placeholder="New password"
          type="password"
          value={passwords.newPass}
          onChange={handleFormInputs}
          error={errors.newPass}
        />
        <Input
          name="repeatPass"
          onChange={handleFormInputs}
          placeholder="Retype New password"
          type="password"
          value={passwords.repeatPass}
          error={errors.repeatPass}
        />
        {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}

        <div className={form_buttons}>
          <Button onClick={sendNewPassword}>Continue</Button>
        </div>
      </div>
    </SignInLayout>
  )
}
