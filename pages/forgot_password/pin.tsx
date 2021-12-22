import { EnterPin } from 'src/containers/SignIn/EnterPin'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../HOC/requireAuthentication'

const PinPage = () => <EnterPin />

export default PinPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)
