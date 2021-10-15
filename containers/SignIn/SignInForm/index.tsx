import { ChangeEvent, useState } from 'react'
import { Button } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { Input } from 'components/Input'
import { LinkText } from 'components/LinkText'
import { useRouter } from 'next/router'
import { LoginFormState } from './types'
import {
  form,
  form_header,
  form_inputs,
  form_password_actions,
  form_buttons,
  ico_button,
} from './SignInForm.module.css'
import { useDispatch } from 'react-redux'

export const SignInForm = () => {
  const [loginFormState, setLoginFormState] = useState<LoginFormState>({
    username: '',
    password: '',
    rememberMe: false,
  })
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLoginForm = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox')
      return setLoginFormState((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }))
    setLoginFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className={form}>
      <h1 className={form_header}>Sign In.</h1>

      <div className={form_inputs}>
        <Input
          name="username"
          placeholder="Username"
          value={loginFormState.username}
          onChange={handleLoginForm}
        />
        <Input
          name="password"
          placeholder="Password"
          value={loginFormState.password}
          onChange={handleLoginForm}
          type="password"
        />
      </div>

      <div className={form_password_actions}>
        <CheckBox
          checked={loginFormState.rememberMe}
          onChange={handleLoginForm}
          label="Remember me"
          name="rememberMe"
        />
        <LinkText href="/signin/forgot_password">
          Forgot your password ?
        </LinkText>
      </div>

      <div className={form_buttons}>
        <Button
          className={ico_button}
          onClick={() =>
            //   LoginUser({
            //     username: loginFormState.username,
            //     password: loginFormState.password,
            //   })
            dispatch({
              type: 'LOGIN_USER',
              payload: {
                username: loginFormState.username,
                password: loginFormState.password,
              },
            })
          }
        >
          Log In
        </Button>
        <Button secondary onClick={() => router.push('signup')}>
          Create an account
        </Button>
      </div>
    </div>
  )
}
