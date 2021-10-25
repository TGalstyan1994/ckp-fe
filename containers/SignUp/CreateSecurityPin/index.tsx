import { Button } from 'components/Button'
import { H1 } from 'components/H1'
import { PinInput } from 'components/PinInput'
import { ChangeEvent, useState } from 'react'
import { form, form_buttons } from './style.module.css'

export const CreateSecurityPin = ({
  finishStage,
}: {
  finishStage?: () => void
}) => {
  const [pin, setPin] = useState('')

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value || e.target.value === '')
      return setPin(e.target.value.trim())
  }

  return (
    <div className={form}>
      <H1 secondary>Create security PIN.</H1>
      <PinInput onChange={handlePin} value={pin}></PinInput>
      <div className={form_buttons}>
        <Button onClick={finishStage}>Continue</Button>
      </div>
    </div>
  )
}
