/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import {
  select,
  select_wrapper,
  select_header,
  select_item,
  empty_header,
  opened,
  select_label,
  required_label,
  select_list,
  disabled_select,
  error_message,
  invalid_select,
} from './style.module.css'

type Props = {
  options: Array<string>
  currentOption: string
  setCurrentOption: (option: string) => void
  placeholder: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

export const Select: FC<Props> = ({
  options,
  currentOption,
  setCurrentOption,
  placeholder,
  label,
  required,
  disabled,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectComponent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickedOutside = (e: MouseEvent) => {
      if (
        selectComponent.current &&
        isOpen &&
        !selectComponent.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', clickedOutside)

    return () => document.addEventListener('mousedown', clickedOutside)
  })

  const toggleIsOpen = () => setIsOpen((prev) => !prev)
  const handleOptionsChange = (option: string) => {
    setCurrentOption(option)
    toggleIsOpen()
  }
  return (
    <div className={select_wrapper}>
      {label && (
        <span className={`${select_label} ${required ? required_label : ''}`}>
          {label}
        </span>
      )}
      <div
        className={classNames(select, {
          [opened]: isOpen,
          [disabled_select]: disabled,
          [invalid_select]: error,
        })}
        ref={selectComponent}
      >
        <p
          className={classNames(select_header, select_item, {
            [empty_header]: !currentOption,
          })}
          onClick={toggleIsOpen}
        >
          {currentOption || placeholder}
        </p>

        {isOpen && (
          <ul className={select_list}>
            {options.map((option) => (
              <li
                key={option}
                className={select_item}
                onClick={() => handleOptionsChange(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={error_message}>{error}</span>
    </div>
  )
}
