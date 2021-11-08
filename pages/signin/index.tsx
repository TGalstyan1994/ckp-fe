import { SignInLayout as Layout } from 'containers/Layouts/SignInLayout'
import { SignInForm } from 'containers/SignIn/SignInForm'
import { ReactElement } from 'react'

const LoginPage = () => <SignInForm />

export default LoginPage

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
