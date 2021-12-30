import React from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import classNames from 'classnames'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import ArrowNextIcon from '../../src/assets/images/icons/arrow-next-icon'
import {
  changeTab,
} from '../../src/store/ProfileDataStore/ProfileDataStore'
import { useSelectorTyped } from '../../src/utils/hooks'
import { Overview } from '../../src/Pages/Profile/overview'
import { Edit } from '../../src/Pages/Profile/edit'
import { Pin } from '../../src/Pages/Profile/pin'
import { Default } from '../../src/Pages/Profile/default'
import { modalPromise } from '../../src/helpers/modal-helper'
import {
  closeModal,
  setShowModal,
} from '../../src/store/MainLayoutDataStore/MainLayoutDataStore'

type ITabNames = 'overview' | 'edit' | 'pin' | 'default'

interface IActiveTab {
  activeTab: ITabNames
}

const tabs = {
  overview: <Overview />,
  edit: <Edit />,
  pin: <Pin />,
  default: <Default />,
}

const ProfilePage = () => {
  const { activeTab }: IActiveTab = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const dispatch = useDispatch()

  const confirmChangeTabs = async (page: ITabNames) => {
    if (!isFormFilled) {
      dispatch(changeTab(page))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeTab(page))
      }
    }
  }

  return (
    <MainLayout>
      <div className="container">
        <div className="relative">
          <h1 className="profile-title">My Profile</h1>
          <span className="title-info">Home / My Profile</span>
        </div>
        <div className="d-flex">
          <div className="row">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar">
                  <p>JD</p>
                  <span>
                    <ArrowNextIcon />
                  </span>
                </div>
                <p className="name">Aaron Hassette</p>
                <button className="btn">Save</button>
              </div>
              <ul>
                <li
                  className={classNames('overview tabs', {
                    activeTab: activeTab === 'overview',
                  })}
                  onClick={() => confirmChangeTabs('overview')}
                >
                  Overview
                </li>
                <li
                  className={classNames('edit tabs', {
                    activeTab: activeTab === 'edit',
                  })}
                  onClick={() => confirmChangeTabs('edit')}
                >
                  Edit Profile
                </li>
                <li
                  className={classNames('pin tabs', {
                    activeTab: activeTab === 'pin',
                  })}
                  onClick={() => confirmChangeTabs('pin')}
                >
                  Security PIN
                </li>
                <li
                  className={classNames('default tabs', {
                    activeTab: activeTab === 'default',
                  })}
                  onClick={() => confirmChangeTabs('default')}
                >
                  Set Default
                </li>
              </ul>
            </div>
          </div>
          {tabs[activeTab]}
        </div>
      </div>
    </MainLayout>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)
