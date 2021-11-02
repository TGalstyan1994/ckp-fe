import { Button } from 'components/Button'
import { H1 } from 'components/H1'
import { Input } from 'components/Input'
import { ChangeEvent, FC, useState } from 'react'
import { form, form_buttons } from './NewPasswordForm.module.css'

export const NewPasswordForm: FC = () => {
  const [passwords, setPasswords] = useState({
    new: '',
    repeat: '',
  })

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
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
  )
}
