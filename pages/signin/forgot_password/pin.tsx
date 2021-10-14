import { SignInLayout as Layout } from 'components/Layouts/SignInLayout'
import { EnterPin } from 'containers/SignIn/EnterPin'
import { ReactElement } from 'react'

const PinPage = () => <EnterPin />

export default PinPage

PinPage.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>
}
