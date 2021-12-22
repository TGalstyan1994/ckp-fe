import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { ChangeEvent, FC, useState } from 'react'
import { form, form_buttons } from './NewPasswordForm.module.css'
import { SignInLayout } from '../../Layouts/SignInLayout'

export const NewPasswordForm: FC = () => {
  const [passwords, setPasswords] = useState({
    new: '',
    repeat: '',
  })

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    <SignInLayout>
      <div className={form}>
        <H1 secondary>Enter new password</H1>
        <Input
          name="new"
          onChange={handleFormInputs}
          placeholder="New password"
          type="password"
          value={passwords.new}
        />
        <Input
          name="repeat"
          onChange={handleFormInputs}
          placeholder="Retype New password"
          type="password"
          value={passwords.repeat}
        />
        <div className={form_buttons}>
          <Button>Continue</Button>
        </div>
      </div>
    </SignInLayout>
  )
}
