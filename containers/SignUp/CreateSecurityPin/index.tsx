import { Button } from 'components/Button'
import { H1 } from 'components/H1'
import { PinInput } from 'components/PinInput'
import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendPinAction } from 'store/actions/signup'
import {
  endStageFetching,
  startStageFetching,
  validateStage,
} from 'store/reducers/signup'
import { haveErrors } from 'utils'
import { useSelectorTyped } from 'utils/hooks'
import { form, form_buttons, form_fetching_error } from './style.module.css'
import { validate } from './validation'

export const CreateSecurityPin: FC = () => {
  const stage = useSelectorTyped((state) => state.signup.stages[1])
  const [pin, setPin] = useState<string>('')

  const dispatch = useDispatch()

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value || e.target.value === '') setPin(e.target.value.trim())
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    const validationErrors = validate({ pin })
    dispatch(validateStage({ errors: validationErrors }))

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching())
      return
    }

    dispatch(sendPinAction(pin))
  }

  return (
    <div className={form}>
      <H1 secondary>Create security PIN.</H1>
      <PinInput onChange={handlePin} value={pin} error={stage.errors?.pin} />
      <PinInput
        onChange={handlePin}
        value={pin}
        error={stage.errors?.pin}
        placeholder="Confirm PIN"
      />
      {stage.fetchError && (
        <span className={form_fetching_error}>{stage.fetchError}</span>
      )}
      <div className={form_buttons}>
        <Button onClick={handleForm} disabled={stage.fetching}>
          Continue
        </Button>
      </div>
    </div>
  )
}
