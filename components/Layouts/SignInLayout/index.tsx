import { Logo } from 'components/Logo'
import side_signin from 'UI/svg/bg.svg'
import { ReactNode } from 'react'
import { login_page, form_wrapper, login_side_image } from './style.module.css'

export const SignInLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={login_page}>
      <Logo />
      <div className={form_wrapper}>{children}</div>
      <img src={side_signin} className={login_side_image} />
    </div>
  )
}
