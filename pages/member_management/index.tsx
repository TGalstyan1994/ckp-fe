import { GetServerSideProps } from 'next'
import { ChangeEvent, useState } from 'react'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import { Input } from '../../src/components/Input'
import { Button } from '../../src/components/Button'

const MemberManagementPage = () => {
  const [serachValue, setSearchValue] = useState('')

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="container">
      <div className="relative member-management">
        <div>
          <h1 className="container-title">Member Management</h1>
          <span className="title-info">
            Home / Admin Tools / Member Management
          </span>
        </div>
        <div className="mm-search">
          <p>found 12 results</p>
          <Input onChange={handleSearchInput} placeholder="Member search" />
          <Button>search</Button>
        </div>
      </div>
      <div className="d-flex">
        <div className="row">
          <div className="profile-card">aaaa</div>
        </div>
      </div>
    </div>
  )
}

export default MemberManagementPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

MemberManagementPage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
