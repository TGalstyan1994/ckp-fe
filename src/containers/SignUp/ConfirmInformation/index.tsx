import { FC, useEffect } from 'react';
import { H1 } from 'src/components/H1';
import { form } from './style.module.css';
import { ConfirmRow } from '../../ConfirmRow';
import { Button } from 'src/components/Button';
import { actions_buttons, confirmRowItems } from './style.module.css';

import { useSelectorTyped } from 'src/utils/hooks';
import { useDispatch } from 'react-redux';
import { getConfirmDetails } from '../../../store/actions/signup';

export const ConfirmInformation: FC = () => {
  const dispatch = useDispatch()
  const { confirmData } = useSelectorTyped((state) => state.signup.stages[4]);

  const handleForm = () =>{

  }


  useEffect(() => {
    dispatch(getConfirmDetails())
  }, [])
  return (
    <div className={form}>
      <H1 secondary>Confirm Information</H1>
      <div className={confirmRowItems}>
        {confirmData?.sponsor && <ConfirmRow rowName="Sponsor Username" rowValue={confirmData.sponsor} />}
        <ConfirmRow rowName="E-mail Address" rowValue={confirmData?.email} />
        <ConfirmRow rowName="First Name" rowValue={confirmData?.firstName} />
        <ConfirmRow rowName="Last Name" rowValue={confirmData?.lastName} />
        <ConfirmRow rowName="Gender" rowValue={confirmData?.gender} />
        <ConfirmRow rowName="Mobile Number" rowValue={confirmData?.phone} />
        <ConfirmRow rowName="Login & Password" rowValue={true} />
        <ConfirmRow rowName="Email Confirmation" rowValue={false} />
        <ConfirmRow rowName="Personal Details" rowValue={confirmData?.isProfileComplete} />
        <ConfirmRow rowName="Payment Details" rowValue={confirmData?.isWalletComplete} />
      </div>
      <div className={actions_buttons}>
        <Button onClick={handleForm} >
          <>proceed</>
        </Button>
      </div>
    </div>
  );
};
