import { withAuth } from 'utils'
import { SignUpStages } from 'containers/Layouts/SignUpLayout'
import { AccountDetails } from 'containers/SignUp/AccountDetails'
import { CreateSecurityPin } from 'containers/SignUp/CreateSecurityPin'
import { SecurityQuestion } from 'containers/SignUp/SecurityQuestion'
import Head from 'next/head'
import { FC } from 'react'

const RegistrationPage: FC = () => {
  const captchaUrl = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_SITE_KEY}`
  return (
    <>
      <Head>
        <script defer src={captchaUrl} />
      </Head>
      <SignUpStages>
        <AccountDetails />
        <CreateSecurityPin />
        <SecurityQuestion />
      </SignUpStages>
    </>
  )
}

export const getStaticProps = withAuth()

export default RegistrationPage
