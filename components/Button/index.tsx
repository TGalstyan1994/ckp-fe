import { FC } from 'react'
import { button, disabled_button, secondary_button } from './style.module.css'
import classNames from 'classnames'

type Props = {
  children: string | number
  className?: string
  disabled?: boolean
  secondary?: boolean
  onClick?: () => void
}
export const Button: FC<Props> = ({
  children,
  className = '',
  disabled,
  secondary,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={classNames(
      button,
      { [className]: className },
      { [disabled_button]: disabled },
      { [secondary_button]: secondary }
    )}
  >
    {children}
  </button>
)
