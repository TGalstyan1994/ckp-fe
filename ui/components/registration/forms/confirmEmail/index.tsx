import React, { useState } from 'react';
import { create } from 'redux/auth/thunks';
import { Button } from 'ui/components/common/button';
import { CodeInput } from 'ui/components/common/codeInput';
import { H1Styled, ButtonsContainer } from './styled';

interface IForm {
  handleNextStage: () => void;
  handlePrevStage: () => void;
}

const ConfirmEmailForm: React.FC<IForm> = ({
  handleNextStage,
  handlePrevStage,
}: IForm) => {
  const [code, setCode] = useState<string>('');
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
      <ButtonsContainer>
        <Button onClick={() => handlePrevStage()}>CANCEL</Button>
        <Button primary>CONTINUE</Button>
      </ButtonsContainer>
    </>
  );
};

export default ConfirmEmailForm;
