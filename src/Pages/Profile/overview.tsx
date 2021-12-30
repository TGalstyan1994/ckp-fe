import React, { FC } from 'react'

export const Overview: FC = () => {
  return (
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
  )
}
