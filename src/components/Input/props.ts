import { ChangeEventHandler } from 'react'

export type Props = {
  name?: string
  value?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  placeholder?: string
  label?: string
  required?: boolean
  type?: 'text' | 'password' | 'checkbox' | 'email' | 'number' | 'pin' | 'radio'
  className?: string
  maxLength?: number
  disabled?: boolean
  defaultValue?: string
}
