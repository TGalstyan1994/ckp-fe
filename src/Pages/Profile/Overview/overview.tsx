import React, { FC, useEffect, useState } from 'react'
import { ProfileManager } from '../../../managers/profile'

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

interface IUserSocialInfo {
  about: string
  facebook: string
  twitter: string
  linkedIn: string
}

interface IUserData {
  account: IUserAccountInfo | Record<string, string>
  personal: IUserPersonalInfo | Record<string, string>
  social: IUserSocialInfo | Record<string, string>
}

export const Overview: FC = () => {
  const [userInfo, setUserInfo] = useState<IUserData>({
    account: {},
    personal: {},
    social: {},
  })

  const Line = ({ text, name }) => {
    return (
      <div className="info">
        <span>{name}:</span>
        {name === 'Facebook:' ||
        name === 'Twitter:' ||
        name === 'Linked In:' ? (
          <span title={text}>
            <a target="_blanck" href={text} rel="noreferrer">
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

      setUserInfo({
        account,
        personal,
        social,
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
        {userInfo.social && (
          <div className="p-30">
            <Line text={userInfo.social.about} name="About me:" />
            <Line text={userInfo.social.facebook} name="Facebook:" />
            <Line text={userInfo.social.about} name="Twitter:" />
            <Line text={userInfo.social.linkedIn} name="Linked In:" />
          </div>
        )}
      </div>
    </div>
  )
}
