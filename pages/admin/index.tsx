import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import classNames from 'classnames'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

import { Referral } from '../../src/AdminPages/ReferralList/referral'
import { KYCPage } from '../../src/AdminPages/KYC/kyc'
import { ActivateDeactivate } from '../../src/AdminPages/Activate_Deactivate/activate_deactivate'
import { Donation } from '../../src/AdminPages/Donation/donation'
import { Profile } from '../../src/AdminPages/Profile/profile'
import { useSelectorTyped } from '../../src/utils/hooks'
import { modalPromise } from '../../src/helpers/modal-helper'
import {
  closeModal,
  setShowModal,
  setPersonalInfo,
} from '../../src/store/MainLayoutDataStore/MainLayoutDataStore'
import { changeAdminTabs } from '../../src/store/MebmerManagementDataStore/MemberManagementDataStore'

import { ProfileManager } from '../../src/managers/profile'

type ITabNames =
  | 'profile'
  | 'donation'
  | 'activate_deactivate'
  | 'kyc'
  | 'referral'

interface IActiveTab {
  activeAdminTab: ITabNames
}

const tabs = {
  profile: <Profile />,
  donation: <Donation />,
  activate_deactivate: <ActivateDeactivate />,
  kyc: <KYCPage />,
  referral: <Referral />,
}

const ProfileAdminPage = () => {
  const { activeAdminTab }: IActiveTab = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const { userData, personalInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const dispatch = useDispatch()
  const confirmChangeTabs = async (page: ITabNames) => {
    if (!isFormFilled || activeAdminTab === page) {
      dispatch(changeAdminTabs(page))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeAdminTabs(page))
      }
    }
  }
  useEffect(() => {
    ;(async () => {
      const res = await ProfileManager.getPersonalInfo()
      dispatch(setPersonalInfo(res))
    })()
  }, [])
  return (
    <div className="container">
      <div className="relative">
        <h1 className="container-title">Member Management</h1>
        <span className="title-info">
          Home / Admin Tools / Member Management
        </span>
      </div>
      <div className="d-flex">
        <div className="admin-row">
          <div className="admin-profile_card">
            <div className="admin-profile_avatar">
              <div className="admin-avatar">
                {userData.avatar ? (
                  <img
                    className="admin-upload_img"
                    src={`${process.env.NEXT_PUBLIC_API}/avatar/${userData.avatar}`}
                    alt="avatar"
                  />
                ) : (
                  <p>
                    {personalInfo.firstName?.slice(0, 1).toUpperCase()}
                    {personalInfo.lastName?.slice(0, 1).toUpperCase()}
                  </p>
                )}
              </div>
              <div>
                <span className="admin-username">{userData.username}</span>
                <p className="admin-name">
                  {personalInfo.firstName
                    ? `${personalInfo.firstName} ${personalInfo.lastName}`
                    : ''}
                </p>
              </div>
            </div>
            <ul
              className={classNames('user-info_tabs', {
                member_items: 'user-info_tabs__member',
              })}
            >
              <li
                className={classNames('profile tabs', {
                  activeAdminTab: activeAdminTab === 'profile',
                })}
                onClick={() => confirmChangeTabs('profile')}
                aria-hidden
              >
                Profile
              </li>
              <li
                className={classNames('donation tabs', {
                  activeAdminTab: activeAdminTab === 'donation',
                })}
                onClick={() => confirmChangeTabs('donation')}
                aria-hidden
              >
                Donation
              </li>
              <li
                className={classNames('referral tabs', {
                  activeAdminTab: activeAdminTab === 'referral',
                })}
                onClick={() => confirmChangeTabs('referral')}
                aria-hidden
              >
                Referral List
              </li>
              <li
                className={classNames('kyc tabs', {
                  activeAdminTab: activeAdminTab === 'kyc',
                })}
                onClick={() => confirmChangeTabs('kyc')}
                aria-hidden
              >
                KYC Documents
              </li>

              <li
                className={classNames('activate_deactivate tabs', {
                  activeAdminTab: activeAdminTab === 'activate_deactivate',
                })}
                onClick={() => confirmChangeTabs('activate_deactivate')}
                aria-hidden
              >
                Activate/Deactivate
              </li>
            </ul>
          </div>
          {tabs[activeAdminTab]}
        </div>
      </div>
    </div>
  )
}

export default ProfileAdminPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

ProfileAdminPage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
