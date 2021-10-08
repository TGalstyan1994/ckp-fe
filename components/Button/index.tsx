import { FC } from 'react'
import classes from './Button.module.css'
const { button, disabled } = classes

type Props = {
  children: string
}
export const Button: FC<Props> = ({ children }) => (
  <button className={button}>{children}</button>
)
