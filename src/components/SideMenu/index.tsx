import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import classNames from 'classnames'
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
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import ToolsIcon from '../../assets/images/icons/tools-icon'

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

const adminMenuItems: Array<IMenuItem> = [
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
      { field: 'New member' },
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
      { field: 'User Replacement' },
      { field: 'Privileged planet management' },
    ],
    pathname: '/donation',
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    clickable: false,
    // url: '',
    pathname: '/academy',
    children: [{ field: 'Users' }, { field: 'Subcategories' }],
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    clickable: false,
    // url: '',
    children: [{ field: 'Email management' }, { field: 'Email campaigns' }],
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
    clickable: false,
    // url: '',
    children: [
      { field: 'Joining' },
      { field: 'Flower Report' },
      { field: 'Donation Report' },
      { field: 'Membership Fee' },
      { field: 'Replacement Report' },
      { field: 'Cycle Fee' },
      { field: 'Relief Fund' },
      { field: 'Activity' },
      { field: 'Account Status' },
      { field: 'Account Analysis' },
    ],
    pathname: '/activities',
  },
  {
    svg: <ToolsIcon />,
    name: 'Admin tools',
    clickable: false,
    pathname: '/admin',
    children: [
      { field: 'Member management' },
      { field: 'Employee management' },
      { field: 'Change logs' },
    ],
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
    clickable: true,
    url: '',
    pathname: '/profile',
  },
]

const userMenuItems: Array<IMenuItem> = [
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

  const { isSuperAdmin } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )

  const router = useRouter()

  const dispatch = useDispatch()

  const toggleSideBar = () => {
    setIsOpen({ openSidebar: !isOpen.openSidebar })
  }

  const handleItems = (items: Array<IMenuItem>) => {
    return items.map((item: IMenuItem) => (
      <LinkText href={item.pathname} key={item.pathname}>
        <div
          className={classNames('icon', {
            icon_active: router.pathname === item.pathname,
          })}
        >
          <span className="svgIcon">{item.svg}</span>
          <span className="name">{item.name}</span>
          <span className="arrow">{item.children && <ArrowOpenIcon />}</span>
          {item.children && (
            <>
              <ul className={item.children?.length ? 'fields' : ''}>
                {item.children.map((child) => (
                  <li className="field" key={child.field}>
                    <span>{child.field}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </LinkText>
    ))
  }

  return (
    <div className="side-menu">
      <div
        className={classNames('side-menu-component', {
          'side-menu-component__open': isOpen.openSidebar,
        })}
      >
        <div className="logo">
          <div className="logo-box">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="side-menu__items">
          <div className="icons">
            {handleItems(isSuperAdmin ? adminMenuItems : userMenuItems)}
          </div>
          <div
            onClick={toggleSideBar}
            aria-hidden
            className={classNames('open-side-menu', {
              active: isOpen.openSidebar,
            })}
          >
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
