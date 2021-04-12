import { useState } from 'react';
import { Select } from 'ui/components/common/select';
import { Textarea } from 'ui/components/common/textarea';

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
        label="textarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
        options={['querty', 'asdf']}
      />
    </div>
  );
};

export default TestPage;
