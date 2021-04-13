<<<<<<< HEAD
import { FC, useState } from 'react'
import { Select } from 'components/select'
=======
import { useState } from 'react';
import { Button } from 'ui/components/common/button';
import { Input } from 'ui/components/common/input';
import { Select } from 'ui/components/common/select';
import { Textarea } from 'ui/components/common/textarea';
import { H1, LinkText } from 'ui/typography';
>>>>>>> 5f037d2... add disabled to common components

const TestPage: FC = () => {
  const [val, setVal] = useState<string>('')
  return (
<<<<<<< HEAD
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
=======
    <div>
      <Input
        label="textarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
        disabled
      />
      <Textarea
>>>>>>> 5f037d2... add disabled to common components
        label="textarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
        disabled
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
