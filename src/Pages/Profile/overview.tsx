import React, { FC, useEffect, useState } from 'react'
import { ProfileManager } from '../../managers/profile'

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
  account: IUserAccountInfo | Record<any, any>
  personal: IUserPersonalInfo | Record<any, any>
  social: IUserSocialInfo | Record<any, any>
}

export const Overview: FC = () => {
  const [userInfo, setUserInfo] = useState<IUserData>({
    account: {},
    personal: {},
    social: {},
  })

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
            <div className="info">
              <span>Member:</span>
              <span>{userInfo.account.member}</span>
            </div>
            <div className="info">
              <span>Username:</span>
              <span>{userInfo.account.username}</span>
            </div>
            <div className="info">
              <span>Sponser name:</span>
              <span>{userInfo.account.sponser}</span>
            </div>
          </div>
        )}
      </div>
      <div className="card-column">
        <div className="card-title">PERSONAL INFO</div>
        <hr />
        {userInfo.personal && (
          <div className="p-30">
            <div className="info">
              <span>First Name:</span>
              <span>{userInfo.personal.firstName}</span>
            </div>
            <div className="info">
              <span>Last Name:</span>
              <span>{userInfo.personal.lastName}</span>
            </div>
            <div className="info">
              <span>Email:</span>
              <span>{userInfo.personal.email}</span>
            </div>
            <div className="info">
              <span>Mobile:</span>
              <span> {userInfo.personal.phone}</span>
            </div>
            <div className="info">
              <span>DOB:</span>
              <span> {userInfo.personal.dateOfBirth}</span>
            </div>
            <div className="info">
              <span>Gender:</span>
              <span>{userInfo.personal.gender}</span>
            </div>
            <div className="info">
              <span>Address:</span>
              <span>{userInfo.personal.address}</span>
            </div>
            <div className="info">
              <span>State:</span>
              <span>{userInfo.personal.state}</span>
            </div>
            <div className="info">
              <span>Country:</span>
              <span>{userInfo.personal.country}</span>
            </div>
            <div className="info">
              <span>City:</span>
              <span>{userInfo.personal.city}</span>
            </div>
            <div className="info">
              <span>Zip Code:</span>
              <span>{userInfo.personal.zipCode}</span>
            </div>
          </div>
        )}
      </div>
      <div className="card-column">
        <div className="card-title">SOCIAL INFO</div>
        <hr />
        {userInfo.social && (
          <div className="p-30">
            <div className="info">
              <span>About me:</span>
              <span>{userInfo.social.about}</span>
            </div>
            <div className="info">
              <span>Facebook:</span>
              <span>{userInfo.social.facebook}</span>
            </div>
            <div className="info">
              <span>Twitter:</span>
              <span>{userInfo.social.twitter}</span>
            </div>
            <div className="info">
              <span>Linked In:</span>
              <span>{userInfo.social.linkedIn}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
