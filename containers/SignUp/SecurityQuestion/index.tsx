import { Button } from 'components/Button'
import { H1 } from 'components/H1'
import { Input } from 'components/Input'
import { ChangeEvent, useState } from 'react'
import {
  form,
  form_inputs,
  form_description,
  form_buttons,
} from './style.module.css'
export const SecurityQuestion = () => {
  const [securityQuestion, setSecurityQuestion] = useState({
    question: '',
    answer: '',
  })
  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) =>
    setSecurityQuestion((prev) => ({ ...prev, answer: e.target.value }))

  return (
    <div className={form}>
      <H1 secondary>Security question</H1>
      <span className={form_description}>
        Create security question and write response.
      </span>
      <div className={form_inputs}>
        <Input
          onChange={handleAnswer}
          value={securityQuestion.answer}
          placeholder="Name of your first pet"
        />

        <Input
          onChange={handleAnswer}
          value={securityQuestion.answer}
          placeholder="Enter the name of your first pet"
        />
      </div>
      <div className={form_buttons}>
        <Button secondary>Cancel</Button>
        <Button>Continue</Button>
      </div>
    </div>
  )
}
