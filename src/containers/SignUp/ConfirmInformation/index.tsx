import { FC, useEffect } from 'react'
import { H1 } from 'src/components/H1'
import { form } from './style.module.css'
import { ConfirmRow } from '../../ConfirmRow'
import { Button } from 'src/components/Button'
import {
  actions_buttons,
  confirmRowItems,
  check_email,
} from './style.module.css'

import { useSelectorTyped } from 'src/utils/hooks'
import { useDispatch } from 'react-redux'
import {
  getConfirmDetails,
  sendVerificationMail,
} from '../../../store/actions/signup'
import { startStageFetching } from '../../../store/reducers/signup'

export const ConfirmInformation: FC = () => {
  const dispatch = useDispatch()
  const { confirmData } = useSelectorTyped((state) => state.signup.stages[4])
  const { status } = useSelectorTyped((state) => state.signin.data.user)

  const handleForm = () => {
    let host = window.location.host

    dispatch(startStageFetching())
    const payload = {
      url: host + '/signup/confirm',
      param: 'code',
    }
    dispatch(sendVerificationMail(payload))
  }

  useEffect(() => {
    if (status !== 'NOT_VERIFIED') {
      dispatch(getConfirmDetails())
    }
  }, [])

  return (
    <div className={form}>
      <H1 secondary>Confirm Information</H1>
      {status === 'NOT_VERIFIED' ? (
        <div className={check_email}>
          Check your email address to proceed with verification.
        </div>
      ) : (
        <>
          <div className={confirmRowItems}>
            {confirmData?.sponsor && (
              <ConfirmRow
                rowName="Sponsor Username"
                rowValue={confirmData.sponsor}
              />
            )}
            <ConfirmRow
              rowName="E-mail Address"
              rowValue={confirmData?.email}
            />
            <ConfirmRow
              rowName="First Name"
              rowValue={confirmData?.firstName}
            />
            <ConfirmRow rowName="Last Name" rowValue={confirmData?.lastName} />
            <ConfirmRow rowName="Gender" rowValue={confirmData?.gender} />
            <ConfirmRow rowName="Mobile Number" rowValue={confirmData?.phone} />
            <ConfirmRow rowName="Login & Password" confirm={true} />
            <ConfirmRow rowName="Email Confirmation" confirm={false} />
            <ConfirmRow
              rowName="Personal Details"
              confirm={confirmData?.isProfileComplete}
            />
            <ConfirmRow
              rowName="Payment Details"
              confirm={confirmData?.isWalletComplete}
            />
          </div>
          <div className={actions_buttons}>
            <Button onClick={handleForm}>
              <>proceed</>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
