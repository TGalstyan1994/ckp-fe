import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { useSelectorTyped } from '../../../../utils/hooks'
import { RootState } from '../../../../store'
import { MemberManagement } from '../../../../managers/memberManagement'
import { toggleAlertModal } from '../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { setIsFormFilled } from '../../../../store/ProfileDataStore/ProfileDataStore'

export const Social: FC = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const { memberAccountInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const [inputValue, setInputValue] = useState({
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  })
  const dispatch = useDispatch()
  const userId = memberAccountInfo.id
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
  }
  const resetValue = () => {
    setInputValue({
      about: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    })
    dispatch(setIsFormFilled(false))
  }
  const onSave = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    try {
      await MemberManagement.updateMemberSocialData({
        ...inputValue,
        userId,
      })
      await dispatch(toggleAlertModal(true))
      resetValue()
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    dispatch(
      setIsFormFilled(
        !Object.values(inputValue).every((name: string) => name === '')
      )
    )
  }, [inputValue])

  useEffect(() => {
    ;(async () => {
      const res = await MemberManagement.getMemberSocialData({ userId })
      setInputValue({ ...res })
    })()
  }, [userId])

  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Social Presence</span>
        </div>
        <div className="w-100">
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="About me"
                name="about"
                placeholder="Null"
                value={inputValue.about}
                onChange={changeValue}
              />
              <Input
                label="Facebook"
                name="facebook"
                placeholder="https://www.facebook.com"
                value={inputValue.facebook}
                onChange={changeValue}
              />
            </div>
          </div>
          <div className="mt-24" />
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="Twitter"
                name="twitter"
                placeholder="https://www.twitter.com"
                value={inputValue.twitter}
                onChange={changeValue}
              />
              <Input
                label="LinkedIn"
                name="linkedIn"
                placeholder="https://www.linkedin.com"
                value={inputValue.linkedIn}
                onChange={changeValue}
              />
            </div>
            <div className="mt-24" />
            <div className="w-140">
              <Button onClick={onSave}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
