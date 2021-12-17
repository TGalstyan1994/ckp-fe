import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { PinInput } from 'src/components/PinInput'
import { ChangeEvent, FC, useState } from 'react'
import { form, form_buttons } from './EnterPin.module.css'

export const EnterPin: FC = () => {
  const [pin, setPin] = useState('')

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value || e.target.value === '')
      return setPin(e.target.value.trim())
  }

  return (
    <div className={form}>
      <H1 secondary>Enter your security PIN?</H1>
      <PinInput onChange={handlePin} value={pin} />
      <div className={form_buttons}>
        <Button>Continue</Button>
      </div>
    </div>
  )
}
