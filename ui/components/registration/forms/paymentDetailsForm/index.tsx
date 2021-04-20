import React, { useState } from 'react';
import { Button } from 'ui/components/common/button';
import { Input } from 'ui/components/common/input';
import { Radio } from 'ui/components/common/radio';
import { H1 } from 'ui/typography';
import { ButtonsContainer } from '../personalDetailsForm/styled';
import { DetailsContainer } from './styled';

const PaymentDetailsForm: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [currencies, setCurrencies] = useState<string>('');
  return (
    <>
      <H1>Payment Details</H1>
      <DetailsContainer>
        <Radio
          label="Currencies"
          required
          value={currencies}
          onChange={setCurrencies}
          options={['USDT ERC 20', 'BTC', 'ETH', 'USDT TRC 20']}
        />
        <Input
          label="Billing Address"
          required
          value={address}
          onChange={(val) => setAddress(val)}
          placeholder="Enter Billing Address"
        />
        <div />
        <ButtonsContainer>
          <Button>BACK</Button>
          <Button primary>CONTINUE</Button>
        </ButtonsContainer>
      </DetailsContainer>
    </>
  );
};

export default PaymentDetailsForm;
