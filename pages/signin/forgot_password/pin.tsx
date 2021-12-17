import { SignInLayout as Layout } from 'src/containers/Layouts/SignInLayout'
import { EnterPin } from 'src/containers/SignIn/EnterPin'
import { ReactElement } from 'react'

const PinPage = () => <EnterPin />

export default PinPage

PinPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
