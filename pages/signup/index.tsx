import { Stages } from 'ui/components/registration/stages'
import {
  SponsorForm,
  AccountForm,
  ConfirmEmailForm,
  PersonalDetailsForm,
  PaymentDetailsForm,
} from 'ui/components/registration/forms/index'
import { withAuth } from 'utils'
import ConfirmInformationForm from 'ui/components/registration/forms/confirmInformationForm'
import { SignUpWrapper } from 'components/Layouts/SignUpLayout'
import { useState } from 'react'

const RegistrationPage = () => {
  const [currentStage, setCurrentStage] = useState(1)
  return (
    <SignUpWrapper currentStage={currentStage} changeStageOn={setCurrentStage}>
      <Stages>
        <SponsorForm />
        <AccountForm />
        <ConfirmEmailForm />
        <PersonalDetailsForm />
        <PaymentDetailsForm />
        <ConfirmInformationForm />
      </Stages>
    </SignUpWrapper>
  )
}

export const getStaticProps = withAuth()

export default RegistrationPage
