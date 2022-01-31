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
import { setShowLoader } from '../../store/GlobalConfigDataStore/GlobalConfigDataStore'

interface IMenuItem {
  svg: JSX.Element
  name: string
  children?: {
    field: string
    pathname: string
  }[]
  pathname: string
  withLoader: boolean
}

const adminMenuItems: Array<IMenuItem> = [
  {
    svg: <HomeIcon />,
    name: 'Dashboard',
    pathname: '/dashboard',
    withLoader: false,
  },
  {
    svg: <GlobeIcon />,
    name: 'Universe',
    children: [
      { pathname: '/universe', field: 'Planet tree' },
      { pathname: '/universe1', field: 'Sponsor tree' },
      { pathname: '/universe2', field: 'Referral list' },
      { pathname: '/universe3', field: 'New member' },
    ],
    pathname: '/universe',
    withLoader: false,
  },
  {
    svg: <MoneyBoxIcon />,
    name: 'Donations',
    children: [
      { pathname: '/donation', field: 'Donations' },
      { pathname: '/donation1', field: 'Cycle fee' },
      { pathname: '/donation2', field: 'Relief fund' },
      { pathname: '/donation3', field: 'Membership fee' },
      { pathname: '/donation4', field: 'Waiting room' },
      { pathname: '/donation5', field: 'User Replacement' },
      { pathname: '/donation6', field: 'Privileged planet management' },
      { pathname: '/donation7', field: 'Users holding tank' },
    ],
    pathname: '/donation',
    withLoader: false,
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    pathname: '/academy',
    children: [
      { pathname: '/academy', field: 'Users' },
      { pathname: '/academy1', field: 'Subcategories' },
    ],
    withLoader: false,
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    children: [
      { pathname: '/communication', field: 'Email management' },
      { pathname: '/communication1', field: 'Email campaigns' },
    ],
    pathname: '/communication',
    withLoader: false,
  },
  {
    svg: <SupportIcon />,
    name: 'Support',
    children: [
      { pathname: '/support', field: 'KYC' },
      { pathname: '/support1', field: 'Payment settings' },
      { pathname: '/support2', field: 'Feedback' },
    ],
    pathname: '/support',
    withLoader: false,
  },
  {
    svg: <ReportsIcon />,
    name: 'Reports',
    children: [
      { pathname: '/activities', field: 'Joining' },
      { pathname: '/activities1', field: 'Flower Report' },
      { pathname: '/activities2', field: 'Donation Report' },
      { pathname: '/activities3', field: 'Membership Fee' },
      { pathname: '/activities4', field: 'Replacement Report' },
      { pathname: '/activities5', field: 'Cycle Fee' },
      { pathname: '/activities6', field: 'Relief Fund' },
      { pathname: '/activities7', field: 'Activity' },
      { pathname: '/activities8', field: 'Account Status' },
      { pathname: '/activities9', field: 'Account Analysis' },
    ],
    pathname: '/activities',
    withLoader: false,
  },
  {
    svg: <ToolsIcon />,
    name: 'Admin tools',
    pathname: '/member_management',
    children: [
      { pathname: '/member_management', field: 'Member management' },
      { pathname: '/member_management1', field: 'Employee management' },
      { pathname: '/member_management2', field: 'Change logs' },
    ],
    withLoader: true,
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
    pathname: '/profile',
    withLoader: false,
  },
]

const userMenuItems: Array<IMenuItem> = [
  {
    svg: <HomeIcon />,
    name: 'Dashboard',
    pathname: '/dashboard',
    withLoader: false,
  },
  {
    svg: <GlobeIcon />,
    name: 'Universe',
    children: [
      { pathname: '/universe', field: 'Planet tree' },
      { pathname: '/universe1', field: 'Sponsor tree' },
      { pathname: '/universe2', field: 'Referral list' },
    ],
    withLoader: false,

    pathname: '/universe',
  },
  {
    svg: <MoneyBoxIcon />,
    name: 'Donations',
    children: [
      { pathname: '/donation', field: 'Donations' },
      { pathname: '/donation1', field: 'Cycle fee' },
      { pathname: '/donation2', field: 'Relief fund' },
      { pathname: '/donation3', field: 'Membership fee' },
      { pathname: '/donation4', field: 'Waiting room' },
    ],
    withLoader: false,

    pathname: '/donation',
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    pathname: '/academy',
    withLoader: false,
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    pathname: '/communication',
    withLoader: false,
  },
  {
    svg: <SupportIcon />,
    name: 'Support',
    children: [
      { pathname: '/support', field: 'KYC' },
      { pathname: '/support1', field: 'Payment settings' },
      { pathname: '/support2', field: 'Feedback' },
    ],
    pathname: '/support',
    withLoader: false,
  },
  {
    svg: <ReportsIcon />,
    name: 'Reports',
    pathname: '/activities',
    withLoader: false,
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
    pathname: '/profile',
    withLoader: false,
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
          icon_active: router.pathname.includes(item.pathname),
        })}
        key={item.pathname}
      >
        {router.pathname === item.pathname ? (
          <div className="icon_title">
            <span className="svgIcon">{item.svg}</span>
            <span className="name">{item.name}</span>
            <span className="arrow">{item.children && <ArrowOpenIcon />}</span>
          </div>
        ) : (
          <LinkText href={item.pathname} key={item.pathname}>
            <div
              className="icon_title"
              onClick={() =>
                item.withLoader && dispatch(dispatch(setShowLoader(true)))
              }
              aria-hidden
            >
              <span className="svgIcon">{item.svg}</span>
              <span className="name">{item.name}</span>
              <span className="arrow">
                {item.children && <ArrowOpenIcon />}
              </span>
            </div>
          </LinkText>
        )}
        {item.children && (
          <ul className={item.children?.length ? 'fields' : ''}>
            {item.children.map((child) =>
              child.pathname === router.pathname ? (
                <li className="field" key={child.field}>
                  <span>{child.field}</span>
                </li>
              ) : (
                <LinkText href={child.pathname} key={child.pathname}>
                  <li className="field" key={child.field}>
                    <span>{child.field}</span>
                  </li>
                </LinkText>
              )
            )}
          </ul>
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
