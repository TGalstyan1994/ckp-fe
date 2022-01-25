import React from 'react'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const AdminPage = () => {
  return <h1>admin</h1>
}
export default AdminPage

AdminPage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
