import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'src/components/Button';
import { H1 } from 'src/components/H1';
import { form, actions_buttons, payment_rightSide, double_input } from './style.module.css';
import { Input } from 'src/components/Input';
import { ChooseCurrenciesForm } from 'src/containers/ChooseCurrenciesForm';
import { useSelectorTyped } from 'src/utils/hooks';
import vector from 'src/UI/Vector.svg';

export const PaymentDetails: FC = () => {
  const dispatch = useDispatch();
  const stage = useSelectorTyped((state) => state.signup.stages[4]);

  // const {  finished } = useSelectorTyped(
  //   (state) => state.signup.stages[4]
  // )

  const [paymentDetailsState, setPaymentDetailsState] = useState({
    currencies: '',
    billingAddress: ''
  });

  const setPaymentDetails = (key: string, value: string) => {
    setPaymentDetailsState((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentDetails(e.target.name, e.target.value);
  };

  const handleForm = () => {
  };

  return (
    <div className={form}>
      <H1 secondary>Payment Details</H1>
      <div className={double_input}>
        <ChooseCurrenciesForm onCurrenciesChange={setPaymentDetails} currenciesState={paymentDetailsState.currencies} />
        <div className={payment_rightSide}>
          <Input
            name='billingAddress'
            onChange={handleFormInputs}
            value={paymentDetailsState.billingAddress}
            label='Billing Address'
            required
            placeholder='Enter Billing Address'
            maxLength={255}
          />
          <div className={actions_buttons}>
            <Button secondary><>Back</></Button>
            <Button onClick={handleForm} disabled={!paymentDetailsState.billingAddress && !paymentDetailsState.currencies}>
              <>Continue</>
              <img src={vector} alt='vector' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};