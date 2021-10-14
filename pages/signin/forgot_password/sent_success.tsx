import { SignInLayout as Layout } from 'components/Layouts/SignInLayout'
import { ReactElement } from 'react'
import sentSuccessSvg from 'UI/svg/forgotPassword.svg'

const sentSuccess = () => <img src={sentSuccessSvg} />

export default sentSuccess

sentSuccess.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
