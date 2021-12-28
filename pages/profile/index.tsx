import React from 'react'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import ArrowNextIcon from '../../src/assets/images/icons/arrow-next-icon'

const ProfilePage = () => {
  return (
    <MainLayout>
      <div className="container">
        <div className="relative">
          <h1 className="profile-title">My Profile</h1>
          <span className="title-info">Home / My Profile</span>
        </div>
        <div className="d-flex">
          <div className="row">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar">
                  <p>JD</p>
                  <span>
                    <ArrowNextIcon />
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
          </div>
          <div className="card-columns">
            <div className="card-column">
              <div className="card-title">ACCOUNT INFO</div>
              <hr />
              <div className="p-30">
                <div className="info">
                  <span>Member:</span>
                  <span>admin</span>
                </div>
                <div className="info">
                  <span>Username:</span>
                  <span>admin</span>
                </div>
                <div className="info">
                  <span>Sponser name:</span>
                  <span>NA</span>
                </div>
              </div>
            </div>
            <div className="card-column">
              <div className="card-title">PERSONAL INFO</div>
              <hr />
              <div className="p-30">
                <div className="info">
                  <span>First Name:</span>
                  <span>Aaron</span>
                </div>
                <div className="info">
                  <span>Last Name:</span>
                  <span>Hassette</span>
                </div>
                <div className="info">
                  <span>Email:</span>
                  <span>callakofa@gmail.com</span>
                </div>
                <div className="info">
                  <span>Mobile:</span>
                  <span> 8683226371</span>
                </div>
                <div className="info">
                  <span>DOB:</span>
                  <span> 2017-05-10</span>
                </div>
                <div className="info">
                  <span>Gender:</span>
                  <span> Male</span>
                </div>
                <div className="info">
                  <span>Address:</span>
                  <span>232 Brierley Street</span>
                </div>
                <div className="info">
                  <span>State:</span>
                  <span>Sangre Grande</span>
                </div>
                <div className="info">
                  <span>Country:</span>
                  <span>Trinidad And Tobago</span>
                </div>
                <div className="info">
                  <span>City:</span>
                  <span>Sangre Grande</span>
                </div>
                <div className="info">
                  <span>Zip Code:</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="card-column">
              <div className="card-title">SOCIAL INFO</div>
              <hr />
              <div className="p-30">
                <div className="info">
                  <span>About me:</span>
                </div>
                <div className="info">
                  <span>Facebook:</span>
                </div>
                <div className="info">
                  <span>Twitter:</span>
                </div>
                <div className="info">
                  <span>Linked In:</span>
                </div>
                <div className="info">
                  <span>Google Plus:</span>
                </div>
              </div>
            </div>
          </div>
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
