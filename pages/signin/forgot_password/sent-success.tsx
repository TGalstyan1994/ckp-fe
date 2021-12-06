import { SignInLayout as Layout } from 'src/containers/Layouts/SignInLayout'
import { ReactElement } from 'react'
import sentSuccessSvg from 'src/UI/forgotPassword.svg'

const sentSuccess = () => <img src={sentSuccessSvg} alt="Successfully sent" />

export default sentSuccess

sentSuccess.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
