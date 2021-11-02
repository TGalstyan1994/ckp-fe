import React, { useState } from 'react'
import { CodeInput } from 'ui/components/common/codeInput'
import { H1Styled } from './styled'

const ConfirmEmailForm: React.FC = () => {
  const [code, setCode] = useState<string>('')
  return (
    <>
      <H1Styled>Email Confirmation</H1Styled>
      <CodeInput
        placeholder="XXXXXX"
        id="code"
        name="code"
        type="text"
        onChange={(val: string) => setCode(val)}
        value={code}
        required
        label="Please enter confirmation code below, where you started creating your account:"
      />
    </>
  )
}

export default ConfirmEmailForm
