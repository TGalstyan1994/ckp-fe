import { FC, useState } from 'react'
import { Button } from 'components/Button'

const TestPage: FC = () => {
  const [val, setVal] = useState<boolean>(false)
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
      <Button disabled={val} onClick={() => console.log("i'm alive")}>
        Click
      </Button>
      <Button onClick={() => setVal((state) => !state)}>Click</Button>

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
