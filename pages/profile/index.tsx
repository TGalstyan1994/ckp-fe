import React from 'react'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import vector from '../../src/assets/images/vector.svg'

const ProfilePage = () => {
  return (
    <MainLayout>
      <div className="container">
        <h1 className="profile-title">My Profile</h1>
        <span className="title-info">Home / My Profile</span>
        <div className="row">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar">
                <p>JD</p>
                <span>
                  <img src={vector} alt="avatar" />
                </span>
              </div>
              <p className="name">Aaron Hassette</p>
              <button className="btn">Save</button>
            </div>
            <ul>
              <li>Overview</li>
              <li>Edit Profile</li>
              <li>Security PIN</li>
              <li>Set Default</li>
            </ul>
          </div>
          <div className="card-column">ssssss</div>
          <div className="card-column">wwww</div>
          <div className="card-column">sss</div>
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
