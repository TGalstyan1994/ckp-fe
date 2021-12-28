import { FC } from 'react'
import { useDispatch } from 'react-redux'
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

interface IMenuItem {
  svg: JSX.Element
  name: string
  clickable: boolean
  children?: {
    field: string
  }[]
  url?: string
}

const menuItems: Array<IMenuItem> = [
  {
    svg: <HomeIcon />,
    name: 'Dashboard',
    clickable: true,
    url: '',
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
  },
  {
    svg: <MortarboardIcon />,
    name: 'Academy',
    clickable: false,
    url: '',
  },
  {
    svg: <EMailIcon />,
    name: 'Communication',
    clickable: false,
    url: '',
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
  },
  {
    svg: <ReportsIcon />,
    name: 'Reports',
    clickable: false,
    url: '',
  },
  {
    svg: <UserIcon />,
    name: 'My Profile',
    clickable: false,
    url: '',
  },
]
export const SideMenu: FC = () => {
  const dispatch = useDispatch()
  return (
    <div className="side-menu">
      <div className="logo">
        <div className="logo-box">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="side-menu__items">
        <ul className="icons">
          {menuItems.map((item: IMenuItem) => (
            <li className="icon" key={item.name}>
              <span className="svgIcon">{item.svg}</span>
              <span className="name">{item.name}</span>
              {item.children && (
                <>
                  <span className="arrow">
                    {item.children?.length && <ArrowOpenIcon />}
                  </span>
                  <ul className={item.children?.length ? 'fields' : ''}>
                    {item.children.map((child) => (
                      <li className="field" key={child.field}>
                        {child.field}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div onClick={() => dispatch(logOut())} className="logout" aria-hidden>
        <div className="logout-icon">
          <LogoutIcon />
        </div>
        <span className="name">Logout</span>
      </div>
    </div>
  )
}