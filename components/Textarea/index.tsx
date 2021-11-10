import classNames from 'classnames'
import { ChangeEvent, FC } from 'react'
import { textarea, textarea_label, required_label } from './style.module.css'

type Props = {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  name: string
  label?: string
  required?: boolean
}

export const TextArea: FC<Props> = ({
  value,
  onChange,
  placeholder,
  name,
  label,
  required,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className={classNames(textarea_label, { [required_label]: required })}
        >
          {label}
        </label>
      )}
      <textarea
        className={textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </>
  )
}
