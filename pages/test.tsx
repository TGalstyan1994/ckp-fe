import { useState } from 'react';
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
    </div>
  );
};

export default TestPage;
