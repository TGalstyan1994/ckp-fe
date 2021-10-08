import { useState } from 'react'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
// import { Button } from 'ui/components/common/button';
// import { Select } from 'ui/components/common/select';
// import { Textarea } from 'ui/components/common/textarea';
// import { H1, LinkText } from 'ui/typography';

const TestPage = () => {
  const [val, setVal] = useState<string>('')
  const error = {
    message: "Can't be empty",
    inValid: !val,
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
      }}
    >
      <Input
        value={val}
        label="Username"
        required
        placeholder="Username"
        onChange={(e) => setVal(e.target.value)}
        error={error.inValid ? error.message : ''}
        type="text"
      />

      <Input
        value={val}
        label="Username"
        required
        placeholder="Username"
        onChange={(e) => setVal(e.target.value)}
        error={error.inValid ? error.message : ''}
        type="text"
      />

      <Button>Button</Button>
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
