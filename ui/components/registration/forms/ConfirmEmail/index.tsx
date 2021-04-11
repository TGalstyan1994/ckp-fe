import React, { useState } from 'react';
import { create } from 'redux/auth/thunks';
import { Input } from 'ui/components/common/input';

const ConfirmEmailForm = () => {
  const [code, setCode] = useState<string>('');
  return (
    <div>
      <Input
        placeholder="code"
        id="code"
        name="code"
        type="text"
        onChange={(val: string) => setCode(val)}
        value={code}
        required
        label="code"
      />
      <button onClick={() => create(code)}>submit</button>
    </div>
  );
};

export default ConfirmEmailForm;
