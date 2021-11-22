import { Input } from 'components/Input'
import { ChangeEvent, FC } from 'react'
import {
  phoneNumberForm_wrapper,
  input_margined,
  phoneNumber_header,
  inputs_wrapper,
} from './style.module.css'

type Props = {
  changeStateCallback: (e: ChangeEvent<HTMLInputElement>) => void
  phoneCode: string
  errors: {
    phoneCode: string | undefined
    phoneNumber: string | undefined
  }
  formState: {
    phoneCode: string
    phoneNumber: string
  }
}

export const PhoneNumberForm: FC<Props> = ({
  changeStateCallback,
  phoneCode,
  errors,
  formState,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === 'phoneCode' &&
      (!+e.target.value || e.target.value === '') &&
      e.target.value !== '+'
    )
      return

    changeStateCallback(e)
  }
  return (
    <div className={phoneNumberForm_wrapper}>
      <span className={phoneNumber_header}>Your Phone Number</span>
      <div className={inputs_wrapper}>
        <Input
          maxLength={phoneCode.length + 1}
          name="phoneCode"
          onChange={handleInput}
          value={formState.phoneCode}
          required
          placeholder={`+${phoneCode}`}
          error={errors.phoneCode}
        />
        <Input
          name="phoneNumber"
          onChange={handleInput}
          className={input_margined}
          value={formState.phoneNumber}
          placeholder="Enter Mobile Number"
          error={errors.phoneNumber}
        />
      </div>
    </div>
  )
}
