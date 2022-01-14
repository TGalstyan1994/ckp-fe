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

  type ITabNames = 'security' | 'personal' | 'social'

  interface IActiveProfileTab {
    activeProfileTab: ITabNames
  }

  const tabs = {
    security: <Security />,
    personal: <Personal />,
    social: <Social />,
  }
  const { activeProfileTab }: IActiveProfileTab = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const handleChangeTab = async (tab: ITabNames) => {
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
    </div>
  )
}
