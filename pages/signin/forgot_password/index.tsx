import { SignInLayout as Layout } from 'containers/Layouts/SignInLayout'
import { ForgotPasswordForm } from 'containers/SignIn/ForgotPassword'
import { ReactElement } from 'react'

const ForgotPasswordPage = () => <ForgotPasswordForm />

export default ForgotPasswordPage

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
