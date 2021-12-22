import sentSuccessSvg from 'src/UI/forgotPassword.svg'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { SignInLayout } from '../../src/containers/Layouts/SignInLayout'
import { requireAuthentication } from '../../HOC/requireAuthentication'

const sentSuccess = () => (
  <SignInLayout>
    <Image src={sentSuccessSvg} alt="Successfully sent" />
  </SignInLayout>
)

export default sentSuccess

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)
