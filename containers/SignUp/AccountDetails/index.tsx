import { Button } from 'components/Button'
import { H1 } from 'components/H1'
import { Input } from 'components/Input'
import { ChangeEvent, useState } from 'react'
import { form, form_inputs, form_buttons } from './style.module.css'
export const AccountDetails = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    repeatPass: '',
  })

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className={form}>
      <H1 secondary>Account Details</H1>
      <div className={form_inputs}>
        <Input
          name="username"
          onChange={handleForm}
          value={formState.username}
          label="Username"
          required
          placeholder="Enter Username"
        />
        <Input
          type="email"
          name="email"
          onChange={handleForm}
          value={formState.email}
          label="E-mail Address"
          required
          placeholder="Enter E-mail Address"
        />
      </div>
      <div className={form_inputs}>
        <Input
          type="password"
          name="password"
          onChange={handleForm}
          value={formState.password}
          label="Password"
          required
          placeholder="Enter Password"
        />
        <Input
          type="password"
          name="repeatPass"
          onChange={handleForm}
          value={formState.repeatPass}
          label="Confirm Password"
          required
          placeholder="Enter Password Again"
        />
      </div>
      <div className={form_buttons}>
        <Button>Continue</Button>
      </div>
    </div>
  )
}
