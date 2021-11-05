/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import { FC, useState } from 'react'
import {
  select,
  select_wrapper,
  select_header,
  select_item,
  empty_header,
  opened,
} from './style.module.css'

type Props = {
  options: Array<string>
  currentOption: string
  setCurrentOption: (option: string) => void
}

export const Select: FC<Props> = ({
  options,
  currentOption,
  setCurrentOption,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen((prev) => !prev)
  const handleOptionsChange = (option: string) => {
    setCurrentOption(option)
    toggleIsOpen()
  }
  return (
    <div className={select_wrapper}>
      <ul className={classNames(select, { [opened]: isOpen })}>
        <li
          className={classNames(select_header, select_item, {
            [empty_header]: !currentOption,
          })}
          onClick={toggleIsOpen}
        >
          {currentOption || 'Name of your first pet'}
        </li>
        {isOpen &&
          options.map((option) => (
            <li
              key={option}
              className={select_item}
              onClick={() => handleOptionsChange(option)}
            >
              {option}
            </li>
          ))}
      </ul>
    </div>
  )
}
