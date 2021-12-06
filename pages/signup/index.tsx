import { withAuth } from 'src/utils'
import { SignUpStages } from 'src/containers/Layouts/SignUpLayout'
import { AccountDetails } from 'src/containers/SignUp/AccountDetails'
import { CreateSecurityPin } from 'src/containers/SignUp/CreateSecurityPin'
import { SecurityQuestion } from 'src/containers/SignUp/SecurityQuestion'
import Head from 'next/head'
import { FC } from 'react'
import { PersonalDetails } from 'src/containers/SignUp/PersonalDetails'

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
        <PersonalDetails />
      </SignUpStages>
    </>
  )
}

export const getStaticProps = withAuth()

export default RegistrationPage
