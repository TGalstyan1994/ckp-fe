import { FC, useState } from 'react'
import { Select } from 'components/select'

const TestPage: FC = () => {
  const [val, setVal] = useState<string>('')
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
      {/* <Textarea
        label="textarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
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
