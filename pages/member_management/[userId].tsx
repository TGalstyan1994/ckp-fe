import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'

const MemberPageById = () => {
  const router = useRouter()
  const { userId } = router.query

  console.log(userId)

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

export default MemberPageById

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

MemberPageById.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
