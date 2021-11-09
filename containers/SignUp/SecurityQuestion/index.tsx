import { Button } from 'components/Button'
import { H1 } from 'components/H1'
import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  endStageFetching,
  setCurrentOption,
  startStageFetching,
  validateStage,
} from 'store/reducers/signup'
import { useSelectorTyped } from 'utils/hooks'
import { haveErrors } from 'utils'
import { sendSecurityQuestion } from 'store/actions/signup'
import { validate } from './validation'
import {
  form,
  form_inputs,
  form_description,
  form_buttons,
} from './style.module.css'

export const SecurityQuestion: FC = () => {
  const [securityAnswer, setSecurityAnswer] = useState('')
  const { options, currentOption, errors, fetching } = useSelectorTyped(
    (state) => state.signup.stages[2]
  )
  const dispatch = useDispatch()

  const setCurrentOptionCallback = (option: string) => {
    dispatch(setCurrentOption(option))
  }

  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setSecurityAnswer(e.target.value)
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    const validationErrors = validate(securityAnswer, currentOption)
    dispatch(validateStage({ errors: validationErrors }))

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching())
      return
    }

    dispatch(
      sendSecurityQuestion({
        question: 'QUESTION_1',
        answer: securityAnswer,
      })
    )
  }

  return (
    <div className={form}>
      <H1 secondary>Security question</H1>

      <span className={form_description}>
        Create security question and write response.
      </span>

      <div className={form_inputs}>
        <Select
          placeholder="Enter the name of your first pet"
          options={Object.keys(options) || []}
          currentOption={currentOption || ''}
          setCurrentOption={setCurrentOptionCallback}
        />

        <Input
          onChange={handleAnswer}
          value={securityAnswer}
          placeholder="Enter the name of your first pet"
          error={errors?.answer}
        />
      </div>

      <div className={form_buttons}>
        <Button secondary>Cancel</Button>

        <Button onClick={handleForm} disabled={fetching}>
          Continue
        </Button>
      </div>
    </div>
  )
}
