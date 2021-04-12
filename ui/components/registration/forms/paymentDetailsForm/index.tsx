import React, { useState } from 'react';
import { Input } from 'ui/components/common/input';

const PaymentDetailsForm: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  return (
    <div>
      <select>
        <option value="USDT ERC 20">USDT ERC 20</option>
        <option value="USDT ERC 20">BTC</option>
        <option value="ETH">ETH</option>
        <option value="USDT TRC 20">USDT TRC 20</option>
      </select>
      <Input
        value={address}
        onChange={(val) => setAddress(val)}
        placeholder="Enter Billing Address"
      />
    </div>
  );
};

export default PaymentDetailsForm;
