import { FC } from 'react'
import { link_text } from './LinkText.module.css'
import Link from 'next/link'

type Props = {
  children: string
  href: string
}

export const LinkText: FC<Props> = ({ children, href }) => (
  <span className={link_text}>
    <Link href={href}>{children}</Link>
  </span>
)
