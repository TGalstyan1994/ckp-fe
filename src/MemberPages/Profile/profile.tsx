import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { Security } from './ProfilePages/Security/security'
import { Personal } from './ProfilePages/Personal/personal'
import { Social } from './ProfilePages/Social/social'
import { Account } from './ProfilePages/Account/account'
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import { modalPromise } from '../../helpers/modal-helper'
import {
  closeModal,
  setShowModal,
} from '../../store/MainLayoutDataStore/MainLayoutDataStore'
import { changeProfileTab } from '../../store/MebmerManagementDataStore/MemberManagementDataStore'

type ITabNames = 'account' | 'security' | 'personal' | 'social'

interface IActiveProfileTab {
  activeProfileTab: ITabNames
}
const tabs = {
  personal: <Personal />,
  security: <Security />,
  social: <Social />,
  account: <Account />,
}
export const Profile: FC = () => {
  const { activeProfileTab }: IActiveProfileTab = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const dispatch = useDispatch()
  const handleChangeTab = async (tab: ITabNames) => {
    if (!isFormFilled || activeProfileTab === tab) {
      dispatch(changeProfileTab(tab))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeProfileTab(tab))
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(changeProfileTab('account'))
    }
  }, [])
  return (
    <div className="admin-holder">
      <div className="title">
        <p>Profile</p>
      </div>

      <div className="sections sections__admin">
        <div
          className={classNames('account info', {
            activeInfo: activeProfileTab === 'account',
          })}
          onClick={() => handleChangeTab('account')}
          aria-hidden
        >
          <span>Account Info</span>
        </div>
        <div
          className={classNames('personal info', {
            activeInfo: activeProfileTab === 'personal',
          })}
          onClick={() => handleChangeTab('personal')}
          aria-hidden
        >
          <span>Personal Info</span>
        </div>
        <div
          className={classNames('security info', {
            activeInfo: activeProfileTab === 'security',
          })}
          onClick={() => handleChangeTab('security')}
          aria-hidden
        >
          <span>Security Info</span>
        </div>
        <div
          className={classNames('social info', {
            activeInfo: activeProfileTab === 'social',
          })}
          onClick={() => handleChangeTab('social')}
          aria-hidden
        >
          <span>Social Info</span>
        </div>
      </div>
      {tabs[activeProfileTab]}
    </div>
  )
}
