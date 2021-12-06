import { SignInLayout as Layout } from 'src/containers/Layouts/SignInLayout'
import { SignInForm } from 'src/containers/SignIn/SignInForm'
import { ReactElement } from 'react'

const LoginPage = () => <SignInForm />

export default LoginPage

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
