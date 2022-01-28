import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import { Profile } from '../../src/MemberPages/Profile/profile'
import { Donation } from '../../src/MemberPages/Donation/donation'
import { ActivateDeactivate } from '../../src/MemberPages/Activate_Deactivate/activate_deactivate'
import { KYCPage } from '../../src/MemberPages/KYC/kyc'
import { Referral } from '../../src/MemberPages/ReferralList/referral'
import { useSelectorTyped } from '../../src/utils/hooks'
import { RootState } from '../../src/store'
import { changeTabs } from '../../src/store/MebmerManagementDataStore/MemberManagementDataStore'
import { modalPromise } from '../../src/helpers/modal-helper'
import {
  closeModal,
  setShowModal,
} from '../../src/store/MainLayoutDataStore/MainLayoutDataStore'
import { MemberManagement } from '../../src/managers/memberManagement'
import ArrowNextIcon from '../../src/assets/images/icons/arrow-next-icon'

type ITabNames =
  | 'profile'
  | 'donation'
  | 'activate_deactivate'
  | 'kyc'
  | 'referral'

interface IActiveTab {
  activeTab: ITabNames
}

const tabs = {
  profile: <Profile />,
  donation: <Donation />,
  activate_deactivate: <ActivateDeactivate />,
  kyc: <KYCPage />,
  referral: <Referral />,
}

const MemberPageById = () => {
  const router = useRouter()
  const { userId } = router.query
  const { activeTab }: IActiveTab = useSelectorTyped(
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
    if (!isFormFilled || activeTab === page) {
      dispatch(changeTabs(page))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeTabs(page))
      }
    }
  }
  console.log(userId)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await MemberManagement.getMemberData(userId)
        console.log(res)
      } catch (error) {
        throw error
      }
    })()
  }, [])
  return (
    <div className="container">
      <div className="relative">
        <div
          className="back-member"
          aria-hidden
          onClick={() => router.push('/member_management')}
        >
          <span>
            <ArrowNextIcon />
          </span>
          <p>Back to Profiles</p>
        </div>
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
            <ul className="user-info_tabs member_items">
              <li
                className={classNames('profile tabs', {
                  activeTab: activeTab === 'profile',
                })}
                onClick={() => confirmChangeTabs('profile')}
                aria-hidden
              >
                Profile
              </li>
              <li
                className={classNames('donation tabs', {
                  activeTab: activeTab === 'donation',
                })}
                onClick={() => confirmChangeTabs('donation')}
                aria-hidden
              >
                Donation
              </li>
              <li
                className={classNames('referral tabs', {
                  activeTab: activeTab === 'referral',
                })}
                onClick={() => confirmChangeTabs('referral')}
                aria-hidden
              >
                Referral List
              </li>
              <li
                className={classNames('kyc tabs', {
                  activeTab: activeTab === 'kyc',
                })}
                onClick={() => confirmChangeTabs('kyc')}
                aria-hidden
              >
                KYC Documents
              </li>

              <li
                className={classNames('activate_deactivate tabs', {
                  activeTab: activeTab === 'activate_deactivate',
                })}
                onClick={() => confirmChangeTabs('activate_deactivate')}
                aria-hidden
              >
                Activate/Deactivate
              </li>
            </ul>
          </div>
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  )
}

export default MemberPageById

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

MemberPageById.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
