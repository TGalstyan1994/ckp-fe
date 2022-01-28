import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from '../../../utils/hooks'
import { getAccessToken } from '../../../utils'
import { storeAccessToken } from '../../../store/reducers/signin'
import { SideMenu } from '../../../components/SideMenu'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { RootState } from '../../../store'
import { ConfirmModal } from '../../../components/Modal/ConfirmModal'
import { setIsFormFilled } from '../../../store/ProfileDataStore/ProfileDataStore'
import { AlertModal } from '../../../components/Modal/AlertModal'
import PromptModal from '../../../components/Modal/PromptModal'
import { EnterSecurityPin } from '../../../components/Modal/ConfirmModal/enterSecurityPin'
import { EnterSecurityQuestion } from '../../../components/Modal/ConfirmModal/enterSecurityQuestion'
import {
  setPersonalInfo,
  setUserData,
} from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { GlobalManager } from '../../../managers/global'
import {
  setDefaults,
  setIsSuperAdmin,
} from '../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { ProfileManager } from '../../../managers/profile'
import MainLoader from '../../../components/Loaders/MainLoader'

interface IMainLayout {
  children: JSX.Element
}

const MainLayout = ({ children }: IMainLayout) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelectorTyped((state) => state.signin)
  const [loading, setLoading] = useState(true)

  const {
    showConfirmModal,
    showAlertModal,
    showPromptModal,
    showPinModal,
    showQuestionModal,
  } = useSelectorTyped((state: RootState) => state.MainLayoutDataStore)

  const { activeProfileTab, activeTab } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/signin')
    } else {
      if (!data.accessToken) {
        dispatch(storeAccessToken(getAccessToken()))
      }
      setLoading(false)
    }
  }, [data.accessToken])

  useEffect(() => {
    dispatch(setIsFormFilled(false))
  }, [activeProfileTab, activeTab])

  useEffect(() => {
    ;(async () => {
      const [getDefaults, personal, userInfo] = await Promise.all([
        ProfileManager.getDefaults(),
        ProfileManager.getPersonalInfo(),
        GlobalManager.getUser(),
      ])

      dispatch(setPersonalInfo(personal))
      dispatch(setDefaults(getDefaults))
      const { isSuperAdmin, ...userData } = userInfo
      dispatch(setUserData(userData))
      dispatch(setIsSuperAdmin(isSuperAdmin))
    })()
  }, [])

  return (
    <div className="main-wrapper">
      {showConfirmModal && <ConfirmModal />}
      {showAlertModal && <AlertModal />}
      {showPromptModal && <PromptModal />}
      {showPinModal && <EnterSecurityPin />}
      {showQuestionModal && <EnterSecurityQuestion />}
      <Header />
      <SideMenu />
      <div className="main-container">{children}</div>
      <Footer />
      {loading ? <MainLoader /> : ''}
    </div>
  )
}

export default MainLayout
