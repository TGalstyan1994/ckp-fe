import { FC } from 'react'
import Link from 'next/link'
import { link_text } from './LinkText.module.css'

type Props = {
  children: string
  href: string
}

export const LinkText: FC<Props> = ({ children, href }) => (
  <span className={link_text}>
    <Link href={href}>{children}</Link>
  </span>
)
