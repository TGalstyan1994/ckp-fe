import classNames from 'classnames'
import { Input } from 'components/Input'
import { RadioBox } from 'components/Radio'
import { ChangeEvent, FC } from 'react'
import {
  form,
  form_question,
  form_radios,
  label,
  input_wrapper,
  error_message,
  invalid_form,
} from './style.module.css'

type Props = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRadioChange: (value: boolean) => void
  name: string
  questionLabel: string
  inputLabel: string
  value: string
  answerState: boolean
  error?: string
}

export const OptionalRadioForm: FC<Props> = ({
  onInputChange,
  onRadioChange,
  name,
  questionLabel,
  inputLabel,
  value,
  answerState,
  error,
}) => {
  const answerSetter = (option: string) => {
    if (option === 'Yes') return onRadioChange(true)
    return onRadioChange(false)
  }

  return (
    <div className={form}>
      <div className={classNames(form_question, { [invalid_form]: error })}>
        <span className={label}>{questionLabel}</span>
        <div className={form_radios}>
          <RadioBox
            name={name}
            option="Yes"
            onChange={() => answerSetter('Yes')}
          />
          <RadioBox
            name={name}
            option="No"
            onChange={() => answerSetter('No')}
          />
        </div>
      </div>
      <span className={error_message}>{error}</span>
      {answerState && (
        <div className={input_wrapper}>
          <Input
            onChange={onInputChange}
            name={name}
            label={inputLabel}
            value={value}
          />
        </div>
      )}
    </div>
  )
}
