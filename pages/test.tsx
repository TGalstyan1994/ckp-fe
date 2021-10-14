import axios from 'axios'
import { Button } from 'components/Button'
import { LinkText } from 'components/LinkText'
import { PinInput } from 'components/PinInput'
import { ChangeEvent, useState } from 'react'

const TestPage = () => {
  const [val, setVal] = useState<string>('')
  const error = {
    message: "Can't be empty",
    inValid: false,
  }
  const handle = (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <PinInput onChange={handle}></PinInput>

      {/* <Textarea
        label="textarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
      />
      <Select
        label="terrrxtarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
        options={['querty', 'asdf']}
      />
      <Button disabled primary>
        button click
      </Button>
      <Button disabled>Create an account</Button>

      <H1 primary>Sign In.</H1>
      <H1>Sign In.</H1>
      <br />
      <LinkText>Forgot your password ?</LinkText> */}
    </div>
  )
}

export default TestPage
