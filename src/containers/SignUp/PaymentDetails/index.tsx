import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import {
  form,
  actions_buttons,
  payment_rightSide,
  double_input,
} from './style.module.css'
import { Input } from 'src/components/Input'
import { ChooseCurrenciesForm } from 'src/containers/ChooseCurrenciesForm'
import { useSelectorTyped } from 'src/utils/hooks'
import vector from 'src/UI/Vector.svg'
import {
  backStage,
  endStageFetching,
  startStageFetching,
  validateStage,
} from '../../../store/reducers/signup'
import { validate } from './validate'
import { haveErrors } from '../../../utils'
import { sendPaymentDetails } from '../../../store/actions/signup'

export const PaymentDetails: FC = () => {
  const dispatch = useDispatch()
  const stage = useSelectorTyped((state) => state.signup.stages[4])

  const [paymentDetails, setPaymentDetails] = useState({
    accountCurrency: '',
    accountAddress: '',
  })

  const handleCurrencyChange = (key: string, value: string) => {
    setPaymentDetails({ ...paymentDetails, [key]: value })
  }

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    handleCurrencyChange(e.target.name, e.target.value)
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    const validationErrors = validate(paymentDetails)
    dispatch(validateStage({ errors: validationErrors }))

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching())
      return
    }

    dispatch(sendPaymentDetails(paymentDetails))
  }

  const handleBack = () => {
    dispatch(backStage())
  }

  return (
    <div className={form}>
      <H1 secondary>Payment Details</H1>
      <div className={double_input}>
        <ChooseCurrenciesForm
          onCurrenciesChange={handleCurrencyChange}
          currenciesState={paymentDetails.accountCurrency}
        />
        <div className={payment_rightSide}>
          <Input
            name="accountAddress"
            onChange={handleFormInputs}
            value={paymentDetails.accountAddress}
            label="Billing Address"
            required
            placeholder="Enter Billing Address"
            maxLength={255}
          />
          <div className={actions_buttons}>
            <Button secondary onClick={handleBack}>
              <>Back</>
            </Button>
            <Button
              onClick={handleForm}
              disabled={
                !paymentDetails.accountAddress ||
                !paymentDetails.accountCurrency
              }
            >
              <>Continue</>
              <img src={vector} alt="vector" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
