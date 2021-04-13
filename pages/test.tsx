import { useState } from 'react';
import { Button } from 'ui/components/common/button';
import { Select } from 'ui/components/common/select';
import { Textarea } from 'ui/components/common/textarea';
import { H1, LinkText } from 'ui/typography';

const TestPage = () => {
  const [val, setVal] = useState<string>('');
  return (
    <div>
      <Textarea
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
      <Button disabled primary>button click</Button>
      <Button disabled>Create an account</Button>
      <Button primary>button click</Button>
      <Button>Create an account</Button>
      <H1 primary>Sign In.</H1>
      <H1>Sign In.</H1>
      <LinkText primary>Forgot your password ?</LinkText><br />
      <LinkText>Forgot your password ?</LinkText>
    </div>
  );
};

export default TestPage;
