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
  children?: {
    field: string
    pathname: string
  }[]
  pathname: string
}

const adminMenuItems: Array<IMenuItem> = [
  {
    svg: <HomeIcon />,
    name: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    svg: <GlobeIcon />,
    name: 'Universe',
    children: [
      { pathname: '/', field: 'Planet tree' },
      { pathname: '/', field: 'Sponsor tree' },
      { pathname: '/', field: 'Referral list' },
      { pathname: '/', field: 'New member' },
    ],
    pathname: '/universe',
  },
  {
    svg: <MoneyBoxIcon />,
    name: 'Donations',
    children: [
      { pathname: '/', field: 'Donations' },
      { pathname: '/', field: 'Cycle fee' },
      { pathname: '/', field: 'Relief fund' },
      { pathname: '/', field: 'Membership fee' },
      { pathname: '/', field: 'Waiting room' },
      { pathname: '/', field: 'User Replacement' },
      { pathname: '/', field: 'Privileged planet management' },
    ],
    pathname: '/donation',
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    pathname: '/academy',
    children: [
      { pathname: '/', field: 'Users' },
      { pathname: '/', field: 'Subcategories' },
    ],
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    children: [
      { pathname: '/', field: 'Email management' },
      { pathname: '/', field: 'Email campaigns' },
    ],
    pathname: '/communication',
  },
  {
    svg: <SupportIcon />,
    name: 'Support',
    children: [
      { pathname: '/', field: 'KYC' },
      { pathname: '/', field: 'Payment settings' },
      { pathname: '/', field: 'Feedback' },
    ],
    pathname: '/support',
  },
  {
    svg: <ReportsIcon />,
    name: 'Reports',
    children: [
      { pathname: '/', field: 'Joining' },
      { pathname: '/', field: 'Flower Report' },
      { pathname: '/', field: 'Donation Report' },
      { pathname: '/', field: 'Membership Fee' },
      { pathname: '/', field: 'Replacement Report' },
      { pathname: '/', field: 'Cycle Fee' },
      { pathname: '/', field: 'Relief Fund' },
      { pathname: '/', field: 'Activity' },
      { pathname: '/', field: 'Account Status' },
      { pathname: '/', field: 'Account Analysis' },
    ],
    pathname: '/activities',
  },
  {
    svg: <ToolsIcon />,
    name: 'Admin tools',
    pathname: '/member_management',
    children: [
      { pathname: '/member_management', field: 'Member management' },
      { pathname: '/', field: 'Employee management' },
      { pathname: '/', field: 'Change logs' },
    ],
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
    pathname: '/profile',
  },
]

const userMenuItems: Array<IMenuItem> = [
  {
    svg: <HomeIcon />,
    name: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    svg: <GlobeIcon />,
    name: 'Universe',
    children: [
      { pathname: '/', field: 'Planet tree' },
      { pathname: '/', field: 'Sponsor tree' },
      { pathname: '/', field: 'Referral list' },
    ],
    pathname: '/universe',
  },
  {
    svg: <MoneyBoxIcon />,
    name: 'Donations',
    children: [
      { pathname: '/', field: 'Donations' },
      { pathname: '/', field: 'Cycle fee' },
      { pathname: '/', field: 'Relief fund' },
      { pathname: '/', field: 'Membership fee' },
      { pathname: '/', field: 'Waiting room' },
    ],
    pathname: '/donation',
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    pathname: '/academy',
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    pathname: '/communication',
  },
  {
    svg: <SupportIcon />,
    name: 'Support',
    children: [
      { pathname: '/', field: 'KYC' },
      { pathname: '/', field: 'Payment settings' },
      { pathname: '/', field: 'Feedback' },
    ],
    pathname: '/support',
  },
  {
    svg: <ReportsIcon />,
    name: 'Reports',
    pathname: '/activities',
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
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
      <div
        className={classNames('icon', {
          icon_active: router.pathname === item.pathname,
        })}
      >
        <LinkText href={item.pathname} key={item.pathname}>
          <div className="icon_title">
            <span className="svgIcon">{item.svg}</span>
            <span className="name">{item.name}</span>
            <span className="arrow">{item.children && <ArrowOpenIcon />}</span>
          </div>
        </LinkText>
        {item.children && (
          <>
            <ul className={item.children?.length ? 'fields' : ''}>
              {item.children.map((child) => (
                <LinkText href={child.pathname} key={item.pathname}>
                  <li className="field" key={child.field}>
                    <span>{child.field}</span>
                  </li>
                </LinkText>
              ))}
            </ul>
          </>
        )}
      </div>
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
