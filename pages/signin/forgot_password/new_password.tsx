import { SignInLayout as Layout } from 'components/Layouts/SignInLayout'
import { NewPasswordForm } from 'containers/SignIn/NewPassword'
import { ReactElement } from 'react'

const newPasswordPage = () => <NewPasswordForm />
newPasswordPage.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>
}
export default newPasswordPage
