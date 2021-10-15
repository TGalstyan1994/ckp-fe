import { ChangeEvent, useState } from 'react'
import { H1 } from 'components/H1'
import { Button } from 'components/Button'
import {
  form,
  form_buttons_wrapper,
  form_button,
} from './ForgotPasswordForm.module.css'
import { Input } from 'components/Input'
import { useRouter } from 'next/router'

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className={form}>
      <H1>Forgot your password ?</H1>
      <Input
        value={email}
        onChange={changeEmail}
        placeholder="E-mail"
        label="Enter your e-mail address below to reset your password."
      ></Input>
      <div className={form_buttons_wrapper}>
        <Button
          className={form_button}
          onClick={() => router.push('/signin')}
          secondary
        >
          Back
        </Button>
        <Button
          className={form_button}
          onClick={() =>
            //!!!!!! REMOVE !!!!!!!
            new Promise((res) =>
              setTimeout(
                () => res(router.push('forgot_password/sent_success')),
                500
              )
            )
          }
        >
          Submit
        </Button>
      </div>
    </div>
  )
}