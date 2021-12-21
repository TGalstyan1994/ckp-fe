import React from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import { logOut } from '../../src/store/reducers/signin'
import MainLayout from '../../src/containers/Layouts/MainLayout'

const ProfilePage = () => {
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <div>
        profile
        <button onClick={() => dispatch(logOut())}>Log Out</button>
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
