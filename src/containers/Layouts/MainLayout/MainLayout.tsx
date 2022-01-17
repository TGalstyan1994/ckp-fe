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
import { ProfileManager } from '../../../managers/profile'
import { setUserData } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'

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
      const res = await ProfileManager.getAccountUser()
      dispatch(setUserData(res))
    })()
  }, [])

  if (loading) return <div>Loading...</div>

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
    </div>
  )
}

export default MainLayout
