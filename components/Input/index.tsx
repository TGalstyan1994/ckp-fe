import { FC, useState } from 'react'
import { PasswordSwitchICO } from 'components/ICO/password-switch-ico'
import classNames from 'classnames'
import {
  input_container,
  input_wrapper,
  input_label,
  required_label,
  input,
  invalid_input,
  error_message,
  disabled_input,
} from './style.module.css'
import { Props } from './props'

export const Input: FC<Props> = ({
  type = 'text',
  value,
  onChange,
  error = '',
  placeholder,
  label,
  required,
  name,
  className = '',
  maxLength,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(!(type === 'password'))
  const togglePasswordView = () => setShowPassword((prev) => !prev)

  let InputType = type
  if (type === 'password') InputType = showPassword ? 'text' : 'password'
  if (type === 'pin') InputType = 'password'

  return (
    <div className={input_container}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(input_label, { [required_label]: required })}
        >
          {label}
        </label>
      )}

      <div
        className={classNames(input_wrapper, { [disabled_input]: disabled })}
      >
        <input
          disabled={disabled}
          id={name}
          maxLength={maxLength}
          name={name}
          type={InputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classNames(input, { [invalid_input]: error }, className)}
        />
        {type === 'password' && (
          <PasswordSwitchICO
            visible={showPassword}
            onClick={togglePasswordView}
          />
        )}
        <span className={error_message}>{error}</span>
      </div>
    </div>
  )
}
