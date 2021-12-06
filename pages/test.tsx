import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm'
import { ChangeEvent, FC, useState } from 'react'

const TestPage: FC = () => {
  const [answer, setAnswer] = useState('')

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100vw',
        padding: '30px',
        boxSizing: 'border-box',
        height: '100vh',
      }}
    >
      <OptionalRadioForm
        name="Some"
        onInputChange={handleInput}
        questionLabel="Some some some ?"
        value={answer}
        inputLabel="Somesome some"
      />
    </div>
  )
}

export default TestPage
