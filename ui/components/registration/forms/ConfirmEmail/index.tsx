import React, { useState } from 'react';
import { create } from 'redux/auth/thunks';

const ConfirmEmailForm = () => {
  const [code, setCode] = useState<string>('');
  return (
    <div>
      <input
        placeholder="code"
        value={code}
        onChange={({ target }) => setCode(target.value)}
      />
      <button onClick={() => create(code)}>submit</button>
    </div>
  );
};
