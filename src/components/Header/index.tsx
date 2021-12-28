import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import SearchIcon from '../../assets/images/icons/search-icon'
import ClockIcon from '../../assets/images/icons/clock-icon'
import united from '../../assets/images/united.svg'
import BellIcon from '../../assets/images/icons/bell-icon'
import ArrowOpenIcon from '../../assets/images/icons/arrow-open-icon'
import { logOut } from '../../store/reducers/signin'

export const Header: FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="header">
      <div className="search">
        <SearchIcon />
        <input
          value={searchValue}
          className="search-input"
          placeholder="Search for anything"
          onChange={handleChange}
        />
      </div>
      <div className="content">
        <div className="rows-content">
          <div className="date">
            <div className="current-date">
              <span className="mount">Jul</span>
              <ClockIcon />
            </div>
            <div className="current-date">
              <span className="year">2021</span>
              <span className="weak">TUE 06</span>
            </div>
          </div>
          <div className="date">
            <div className="current-date">
              <span className="mount">Local</span>
              <ClockIcon />
            </div>
            <div className="current-date">
              <span className="weak">09:25:51 AM</span>
            </div>
          </div>
          <div className="date">
            <div className="current-date">
              <span className="mount">Server</span>
              <ClockIcon />
            </div>
            <div className="current-date">
              <span className="weak">09:25:51 AM</span>
            </div>
          </div>
        </div>
        <div className="currency">
          <span>$USD</span>
        </div>
        <div className="language">
          <span className="country-icon">
            <img src={united} alt="states" />
          </span>
          <span>English</span>
        </div>
        <div className="bell">
          <BellIcon />
          <span>{/* <img src={ellipse} /> */}3</span>
        </div>
        <div className="avatar">
          <figure className="figure">JD</figure>
        </div>
        <div className="profile-name">
          <span>John Doe</span>
          <span onClick={toggleOpen}>
            <ArrowOpenIcon />
          </span>
          {isOpen && (
            <div className="drop-name">
              <ul>
                <li className="drop-item">My profile</li>
                <li onClick={() => dispatch(logOut())} className="drop-item">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
