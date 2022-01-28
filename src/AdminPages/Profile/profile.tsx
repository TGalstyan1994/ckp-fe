import React, { FC } from 'react'
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
import { changeAdminProfileTab } from '../../store/MebmerManagementDataStore/MemberManagementDataStore'

type ITabNames = 'account' | 'security' | 'personal' | 'social'

interface IActiveProfileTab {
  activeAdminProfileTab: ITabNames
}
const tabs = {
  security: <Security />,
  personal: <Personal />,
  social: <Social />,
  account: <Account />,
}
export const Profile: FC = () => {
  const { activeAdminProfileTab }: IActiveProfileTab = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const dispatch = useDispatch()
  const handleChangeTab = async (tab: ITabNames) => {
    if (!isFormFilled || activeAdminProfileTab === tab) {
      dispatch(changeAdminProfileTab(tab))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeAdminProfileTab(tab))
      }
    }
  }
  return (
    <div className="admin-holder">
      <div className="title">
        <p>Profile</p>
      </div>

      <div
        className={classNames('sections', {
          sections__admin: 'sections__admin',
        })}
      >
        <div
          className={classNames('account info', {
            activeInfo: activeAdminProfileTab === 'account',
          })}
          onClick={() => handleChangeTab('account')}
          aria-hidden
        >
          <span>Account Info</span>
        </div>
        <div
          className={classNames('personal info', {
            activeInfo: activeAdminProfileTab === 'personal',
          })}
          onClick={() => handleChangeTab('personal')}
          aria-hidden
        >
          <span>Personal Info</span>
        </div>
        <div
          className={classNames('security info', {
            activeInfo: activeAdminProfileTab === 'security',
          })}
          onClick={() => handleChangeTab('security')}
          aria-hidden
        >
          <span>Security Info</span>
        </div>
        <div
          className={classNames('social info', {
            activeInfo: activeAdminProfileTab === 'social',
          })}
          onClick={() => handleChangeTab('social')}
          aria-hidden
        >
          <span>Social Info</span>
        </div>
      </div>
      {tabs[activeAdminProfileTab]}
    </div>
  )
}
