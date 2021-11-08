import { ChangeEvent, FC, useState } from 'react'
import { Button } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { Input } from 'components/Input'
import { LinkText } from 'components/LinkText'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { signInAction } from 'store/actions/signin'
import {
  endStageFetching,
  startStageFetching,
  validateForm,
} from 'store/reducers/signin'
import { useSelectorTyped } from 'utils/hooks'
import { ErrorsSpan } from 'components/ErrorsSpan'
import {
  form,
  form_header,
  form_inputs,
  form_password_actions,
  form_buttons,
  ico_button,
} from './SignInForm.module.css'
import { validate } from './validate'

type FormState = {
  username: string
  password: string
}

export const SignInForm: FC = () => {
  const { errors, fetching, fetchingErrors } = useSelectorTyped(
    (state) => state.signin
  )

  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
  })

  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const submitForm = () => {
    dispatch(startStageFetching())
    const ValidationErrors = validate(formState)
    dispatch(validateForm({ errors: ValidationErrors }))

    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(endStageFetching())
      return
    }

    dispatch(signInAction(formState))
  }

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') setRememberMe(e.target.checked)
    else
      setFormState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
  }

  return (
    <div className={form}>
      <h1 className={form_header}>Sign In.</h1>

      <div className={form_inputs}>
        <Input
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleFormInput}
          error={errors.username}
        />
        <Input
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleFormInput}
          type="password"
          error={errors.password}
        />
      </div>
      {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}

      <div className={form_password_actions}>
        <CheckBox
          checked={rememberMe}
          onChange={handleFormInput}
          label="Remember me"
          name="rememberMe"
        />
        <LinkText href="/signin/forgot_password">
          Forgot your password ?
        </LinkText>
      </div>

      <div className={form_buttons}>
        <Button disabled={fetching} className={ico_button} onClick={submitForm}>
          Log In
        </Button>
        <Button secondary onClick={() => router.push('signup')}>
          Create an account
        </Button>
      </div>
    </div>
  )
}
