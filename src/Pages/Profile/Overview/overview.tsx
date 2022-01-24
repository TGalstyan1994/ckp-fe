import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ProfileManager } from '../../../managers/profile'
import { setSocialInfo } from '../../../store/ProfileDataStore/ProfileDataStore'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'

interface IUserAccountInfo {
  username: string
  sponser: string
  member: string
}

interface IUserPersonalInfo {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
}

interface ILine {
  name: string
  text: string
  isLink?: boolean
}

interface IUserData {
  account: IUserAccountInfo | Record<string, string>
  personal: IUserPersonalInfo | Record<string, string>
}

export const Overview: FC = () => {
  const dispatch = useDispatch()
  const { socialInfo } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const [userInfo, setUserInfo] = useState<IUserData>({
    account: {},
    personal: {},
  })

  const Line = ({ text, name, isLink }: ILine) => {
    return (
      <div className="info">
        <span>{name}:</span>
        {isLink ? (
          <span title={text}>
            <a target="_blank" href={text} rel="noreferrer">
              {text}
            </a>
          </span>
        ) : (
          <span title={text}>{text}</span>
        )}
      </div>
    )
  }

  useEffect(() => {
    ;(async () => {
      const [account, personal, social] = await Promise.all([
        ProfileManager.getAccountInfo(),
        ProfileManager.getPersonalInfo(),
        ProfileManager.getSocialInfo(),
      ])
      dispatch(setSocialInfo(social))
      setUserInfo({
        account,
        personal,
      })
    })()
  }, [])

  return (
    <div className="card-columns">
      <div className="card-column">
        <div className="card-title">ACCOUNT INFO</div>
        <hr />
        {userInfo.account && (
          <div className="p-30">
            <Line text={userInfo.account.member} name="Member" />
            <Line text={userInfo.account.username} name="Username" />
            <Line text={userInfo.account.sponser} name="Sponser" />
          </div>
        )}
      </div>
      <div className="card-column">
        <div className="card-title">PERSONAL INFO</div>
        <hr />
        {userInfo.personal && (
          <div className="p-30">
            <Line text={userInfo.personal.firstName} name="First Name" />
            <Line text={userInfo.personal.lastName} name="Last Name" />
            <Line text={userInfo.personal.email} name="Email" />
            <Line text={userInfo.personal.phone} name="Mobile" />
            <Line text={userInfo.personal.dateOfBirth} name="DOB" />
            <Line text={userInfo.personal.gender} name="Gender" />
            <Line text={userInfo.personal.address} name="Address" />
            <Line text={userInfo.personal.state} name="State" />
            <Line text={userInfo.personal.country} name="Country" />
            <Line text={userInfo.personal.city} name="City" />
            <Line text={userInfo.personal.zipCode} name="Zip Code" />
          </div>
        )}
      </div>
      <div className="card-column">
        <div className="card-title">SOCIAL INFO</div>
        <hr />
        <div className="p-30">
          <Line text={socialInfo.about} name="About me" />
          <Line text={socialInfo.facebook} name="Facebook" isLink />
          <Line text={socialInfo.twitter} name="Twitter" isLink />
          <Line text={socialInfo.linkedIn} name="Linked In" isLink />
        </div>
      </div>
    </div>
  )
}
