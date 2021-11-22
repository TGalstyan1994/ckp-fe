import { FC, useRef } from 'react'
import { radioBox_wrapper, radioBox, label } from './style.module.css'

type Props = {
  option: string
  onChange: () => void
  name: string
  checked?: boolean
}

export const RadioBox: FC<Props> = ({ onChange, option, name, checked }) => {
  const radioRef = useRef(null)
  return (
    <div className={radioBox_wrapper}>
      <label className={label}>
        <input
          name={name}
          ref={radioRef}
          type="radio"
          className={radioBox}
          onChange={onChange}
          checked={checked}
        />
        <span>{option}</span>
      </label>
    </div>
  )
}
