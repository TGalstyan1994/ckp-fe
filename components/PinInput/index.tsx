import { Input } from 'components/Input'
import { ChangeEventHandler, FC } from 'react'
import { pin_input } from './PinInput.module.css'

type Props = {
  name?: string
  value?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  placeholder?: string
  label?: string
  required?: boolean
  type?: string
}

export const PinInput: FC<Props> = (props) => {
  return (
    <Input
      maxLength={6}
      className={pin_input}
      placeholder="XXXXXX"
      {...props}
      type="pin"
    />
  )
}
