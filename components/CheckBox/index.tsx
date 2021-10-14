import { ChangeEventHandler, FC } from 'react'
import classNames from 'classnames'
import {
  checkbox,
  label,
  required_label,
  label_disabled,
} from './style.module.css'

type Props = {
  label: string
  required?: boolean
  name?: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

export const CheckBox: FC<Props> = ({
  label: labelContent,
  required,
  name,
  checked,
  onChange,
  disabled,
}) => (
  <>
    <input
      id={checkbox}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={checkbox}
    ></input>
    <label
      htmlFor={checkbox}
      className={classNames(
        label,
        { [required_label]: required },
        { [label_disabled]: disabled }
      )}
    >
      {labelContent}
    </label>
  </>
)
