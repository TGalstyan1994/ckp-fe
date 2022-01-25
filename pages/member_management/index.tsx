import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const MemberManagementPage = () => {
  return (
    <div className="container">
      <div className="relative">
        <h1 className="profile-title">My Profile</h1>
        <span className="title-info">Home / My Profile</span>
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
