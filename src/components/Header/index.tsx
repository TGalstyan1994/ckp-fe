import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import united from '../../assets/images/united.svg'
import BellIcon from '../../assets/images/icons/bell-icon'
import ArrowOpenIcon from '../../assets/images/icons/arrow-open-icon'
import { logOut } from '../../store/reducers/signin'
import { ProfileManager } from '../../managers/profile'
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import { setUserData } from '../../store/MainLayoutDataStore/MainLayoutDataStore'

interface IAccountData {
  currency: string
  language: string
}
export const Header: FC = () => {
  const dispatch = useDispatch()
  const { userData } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const [accountData, setAccountData] = useState<IAccountData>({
    currency: '',
    language: '',
  })

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    ;(async () => {
      const res = await ProfileManager.getDefaults()
      setAccountData({ ...res })
      const userInfo = await ProfileManager.getAccountUser()
      dispatch(setUserData(userInfo))
    })()
  }, [])

  return (
    <div className="header">
      <div className="content">
        <div className="currency">
          <span>{accountData.currency}</span>
        </div>
        <div className="language">
          <span className="country-icon">
            <img src={united} alt="states" />
          </span>
          <span>{accountData.language}</span>
        </div>
        <div className="bell">
          <BellIcon />
          <span>3</span>
        </div>
        <div className="user-profile">
          <div className="avatar" onClick={toggleOpen} aria-hidden>
            {userData.avatar ? (
              <figure className="figure">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/avatar/${userData.avatar}`}
                  alt="aaaa"
                />
              </figure>
            ) : (
              <figure className="figure">JD</figure>
            )}
          </div>
          <div className="profile-name" onClick={toggleOpen} aria-hidden>
            <span>{userData.username}</span>
            <span onClick={toggleOpen} role="button" aria-hidden>
              <ArrowOpenIcon />
            </span>
            {isOpen && (
              <div className="drop-name">
                <ul>
                  <li className="drop-item">My profile</li>
                  <li
                    onClick={() => dispatch(logOut())}
                    className="drop-item"
                    aria-hidden
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
