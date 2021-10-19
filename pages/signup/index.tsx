import { withAuth } from 'utils'
import { SignUpStages } from 'components/Layouts/SignUpLayout'
import { useState } from 'react'
import { AccountDetails } from 'containers/SignUp/AccountDetails'
import { CreateSecurityPin } from 'containers/SignUp/CreateSecurityPin'
import { SecurityQuestion } from 'containers/SignUp/SecurityQuestion'

const RegistrationPage = () => {
  const [currentStage, setCurrentStage] = useState(0)
  return (
    <SignUpStages currentStage={currentStage} changeStageOn={setCurrentStage}>
      <AccountDetails />
      <CreateSecurityPin />
      <SecurityQuestion />
    </SignUpStages>
  )
}

export const getStaticProps = withAuth()

export default RegistrationPage
