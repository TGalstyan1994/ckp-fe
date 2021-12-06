import { SignInLayout as Layout } from 'src/containers/Layouts/SignInLayout'
import { NewPasswordForm } from 'src/containers/SignIn/NewPassword'
import { ReactElement } from 'react'

const newPasswordPage = () => <NewPasswordForm />

newPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default newPasswordPage
