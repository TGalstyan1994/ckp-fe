import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import { changeProfileTab } from '../../store/ProfileDataStore/ProfileDataStore'
import { Personal } from '../EditPages/personal'
import { Security } from '../EditPages/security'
import { Social } from '../EditPages/social'
import {
  closeModal,
  setShowModal,
} from '../../store/MainLayoutDataStore/MainLayoutDataStore'
import { modalPromise } from '../../helpers/modal-helper'

export const Edit: FC = () => {
  const dispatch = useDispatch()

  const { activeProfileTab, isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const renderInfo = () => {
    switch (activeProfileTab) {
      case 'security':
        return <Security />
      case 'personal':
        return <Personal />
      case 'social':
        return <Social />
      default:
        return <Social />
    }
  }
  const handelChangeTab = async (tab: 'personal' | 'security' | 'social') => {
    if (!isFormFilled) {
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

  return (
    <div className="edit-container">
      <div className="sec-title">
        <span>PROFILE</span>
      </div>
      <div className="edit-holder">
        <div className="sections">
          <div
            className={classNames('personal info', {
              activeInfo: activeProfileTab === 'personal',
            })}
            onClick={() => handelChangeTab('personal')}
            aria-hidden
          >
            <span>Personal Info</span>
          </div>
          <div
            className={classNames('security info', {
              activeInfo: activeProfileTab === 'security',
            })}
            onClick={() => handelChangeTab('security')}
            aria-hidden
          >
            <span>Security Info</span>
          </div>
          <div
            className={classNames('social info', {
              activeInfo: activeProfileTab === 'social',
            })}
            onClick={() => handelChangeTab('social')}
            aria-hidden
          >
            <span>Social Info</span>
          </div>
        </div>
        {renderInfo()}
      </div>
    </div>
  )
}
