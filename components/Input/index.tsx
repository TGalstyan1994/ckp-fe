import { ChangeEventHandler, FC } from 'react'
import { ErrorICO } from 'components/ICO/ErrorICO'

import classes from './Input.module.css'
const {
  input_errors_wrapper,
  input_wrapper,
  input_label,
  required_label,
  input,
  invalid_input,
  error_message,
} = classes

type Props = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  error?: string
  placeholder: string
  label?: string
  required?: boolean
  type: string
}

export const Input: FC<Props> = ({
  type,
  value,
  onChange,
  error,
  placeholder,
  label,
  required,
}) => {
  return (
    <div className={input_wrapper}>
      {label && (
        <label className={`${input_label} ${required ? required_label : ''}`}>
          {label}
        </label>
      )}
      <div className={input_errors_wrapper}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${input} ${error ? invalid_input : ''}`}
        ></input>
        {error && (
          <>
            <ErrorICO />
            <span className={error_message}>{error}</span>
          </>
        )}
      </div>
    </div>
  )
}
