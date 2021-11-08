import { SignInLayout as Layout } from 'containers/Layouts/SignInLayout'
import { EnterPin } from 'containers/SignIn/EnterPin'
import { ReactElement } from 'react'

const PinPage = () => <EnterPin />

export default PinPage

PinPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
