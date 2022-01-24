import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import logo from '../../assets/images/logo.svg'
import HomeIcon from '../../assets/images/icons/home-icon'
import GlobeIcon from '../../assets/images/icons/globe-icon'
import MoneyBoxIcon from '../../assets/images/icons/money-box-icon'
import UserIcon from '../../assets/images/icons/user-icon'
import SupportIcon from '../../assets/images/icons/support-icon'
import ReportsIcon from '../../assets/images/icons/reports-icon'
import MortarboardIcon from '../../assets/images/icons/mortarboard-icon'
import EMailIcon from '../../assets/images/icons/e-mail-icon'
import ArrowOpenIcon from '../../assets/images/icons/arrow-open-icon'
import LogoutIcon from '../../assets/images/icons/logout-icon'
import { logOut } from '../../store/reducers/signin'
import { LinkText } from '../LinkText'

interface IMenuItem {
  svg: JSX.Element
  name: string
  clickable: boolean
  children?: {
    field: string
  }[]
  url?: string
  pathname: string
}

const menuItems: Array<IMenuItem> = [
  {
    svg: <HomeIcon />,
    name: 'Dashboard',
    clickable: true,
    url: '',
    pathname: '/dashboard',
  },
  {
    svg: <GlobeIcon />,
    name: 'Universe',
    clickable: false,
    children: [
      { field: 'Planet tree' },
      { field: 'Sponsor tree' },
      { field: 'Referral list' },
    ],
    pathname: '/universe',
  },
  {
    svg: <MoneyBoxIcon />,
    name: 'Donations',
    clickable: false,
    children: [
      { field: 'Donations' },
      { field: 'Cycle fee' },
      { field: 'Relief fund' },
      { field: 'Membership fee' },
      { field: 'Waiting room' },
    ],
    pathname: '/donation',
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    clickable: true,
    url: '',
    pathname: '/academy',
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    clickable: true,
    url: '',
    pathname: '/communication',
  },
  {
    svg: <SupportIcon />,
    name: 'Support',
    clickable: false,
    children: [
      { field: 'KYC' },
      { field: 'Payment settings' },
      { field: 'Feedback' },
    ],
    pathname: '/support',
  },
  {
    svg: <ReportsIcon />,
    name: 'Reports',
    clickable: true,
    url: '',
    pathname: '/activities',
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
    clickable: true,
    url: '',
    pathname: '/profile',
  },
]

export const SideMenu: FC = () => {
  const [isOpen, setIsOpen] = useState({
    openSidebar: false,
  })

  const router = useRouter()

  const dispatch = useDispatch()

  const toggleSideBar = () => {
    setIsOpen({ openSidebar: !isOpen.openSidebar })
  }

  return (
    <div className="side-menu">
      <div
        className={!isOpen.openSidebar ? 'side-menu-toggle' : 'side-menu-open'}
      >
        <div className="logo">
          <div className="logo-box">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="side-menu__items">
          <div className="icons">
            {menuItems.map((item: IMenuItem) => (
              <LinkText href={item.pathname} key={item.pathname}>
                <div
                  className={
                    router.pathname === item.pathname ? 'active-icons' : 'icon'
                  }
                >
                  <span className="svgIcon">{item.svg}</span>
                  <span className="name">{item.name}</span>
                  <span className="arrow">
                    {item.children && <ArrowOpenIcon />}
                  </span>
                  {item.children && (
                    <>
                      <ul className={item.children?.length ? 'fields' : ''}>
                        {item.children.map((child) => (
                          <li className="field" key={child.field}>
                            {child.field}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </LinkText>
            ))}
          </div>
          <div onClick={toggleSideBar} aria-hidden className="open-side-menu">
            <span />
          </div>
        </div>
        <div onClick={() => dispatch(logOut())} className="logout" aria-hidden>
          <div className="logout-icon">
            <LogoutIcon />
          </div>
          <span className="name">Logout</span>
        </div>
      </div>
    </div>
  )
}
