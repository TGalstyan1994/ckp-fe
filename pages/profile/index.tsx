import React, { ChangeEvent, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import classNames from 'classnames'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import ArrowNextIcon from '../../src/assets/images/icons/arrow-next-icon'
import {
  changeTab,
  setErrorMessage,
  changeProfileTab,
} from '../../src/store/ProfileDataStore/ProfileDataStore'
import { useSelectorTyped } from '../../src/utils/hooks'
import { Overview } from '../../src/Pages/Profile/Overview/overview'
import { Edit } from '../../src/Pages/Profile/Edit/edit'
import { Pin } from '../../src/Pages/Profile/Pin/pin'
import { Default } from '../../src/Pages/Profile/Defaults/default'
import { modalPromise } from '../../src/helpers/modal-helper'
import {
  closeModal,
  setShowModal,
  setUserData,
} from '../../src/store/MainLayoutDataStore/MainLayoutDataStore'
import TrashIcon from '../../src/assets/images/icons/trash-icon'
import { ProfileManager } from '../../src/managers/profile'

type ITabNames = 'overview' | 'edit' | 'pin' | 'default'

interface IActiveTab {
  activeTab: ITabNames
}

type IImgPreview = File | ''

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

  const { isFormFilled, errorMessage } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const { userData } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const dispatch = useDispatch()
  const [imgPreview, setImgPreview] = useState<IImgPreview>('')

  const confirmChangeTabs = async (page: ITabNames) => {
    dispatch(changeProfileTab('personal'))
    if (!isFormFilled || activeTab === page) {
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

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setErrorMessage(''))
    if (!e.target.files) return
    const selectedFile = e.target.files[0]
    const FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg']
    if (selectedFile && FILE_TYPE.includes(selectedFile.type)) {
      setImgPreview(selectedFile)
    }
  }

  const onSave = async () => {
    if (!imgPreview) return
    const form = new FormData()
    form.append('file', imgPreview)
    try {
      await ProfileManager.uploadAvatar(form)
      const res = await ProfileManager.getAccountUser()
      dispatch(setUserData(res))
      setImgPreview('')
    } catch (error) {
      throw error
    }
  }

  const onRemove = async () => {
    if (imgPreview) {
      setImgPreview('')
      return
    }

    try {
      await ProfileManager.removeAvatar()
      const res = await ProfileManager.getAccountUser()
      dispatch(setUserData(res))
    } catch (error) {
      throw error
    }
  }
  return (
    <div className="container">
      <div className="relative">
        <h1 className="profile-title">My Profile</h1>
        <span className="title-info">Home / My Profile</span>
      </div>
      <div className="d-flex">
        <div className="row">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-container">
                {(imgPreview || userData.avatar) && (
                  <span
                    className="delete-upload"
                    onClick={onRemove}
                    aria-hidden
                  >
                    <TrashIcon />
                  </span>
                )}
                <div className="avatar">
                  {imgPreview ? (
                    <img
                      className="upload-img"
                      src={URL.createObjectURL(imgPreview)}
                      alt="avatar"
                    />
                  ) : userData.avatar ? (
                    <img
                      className="upload-img"
                      src={`${process.env.NEXT_PUBLIC_API}/avatar/${userData.avatar}`}
                      alt="avatar"
                    />
                  ) : (
                    <p>JD</p>
                  )}
                </div>
                <label htmlFor="file-input" className="image_upload">
                  <ArrowNextIcon />
                  <input
                    type="file"
                    id="file-input"
                    onChange={handleUploadImage}
                    accept="image/png, image/jpeg,image/jpg"
                  />
                </label>
                <span className="image_upload_error">{errorMessage}</span>
              </div>
              <p className="name">{userData.username}</p>
              <button onClick={onSave} className="btn">
                Save
              </button>
            </div>
            <ul>
              <li
                className={classNames('overview tabs', {
                  activeTab: activeTab === 'overview',
                })}
                onClick={() => confirmChangeTabs('overview')}
                aria-hidden
              >
                Overview
              </li>
              <li
                className={classNames('edit tabs', {
                  activeTab: activeTab === 'edit',
                })}
                onClick={() => confirmChangeTabs('edit')}
                aria-hidden
              >
                Edit Profile
              </li>
              <li
                className={classNames('pin tabs', {
                  activeTab: activeTab === 'pin',
                })}
                onClick={() => confirmChangeTabs('pin')}
                aria-hidden
              >
                Security PIN
              </li>
              <li
                className={classNames('default tabs', {
                  activeTab: activeTab === 'default',
                })}
                onClick={() => confirmChangeTabs('default')}
                aria-hidden
              >
                Set Default
              </li>
            </ul>
          </div>
        </div>
        {tabs[activeTab]}
      </div>
    </div>
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

ProfilePage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
