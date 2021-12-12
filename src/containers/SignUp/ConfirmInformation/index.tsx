import { FC } from 'react';
import { H1 } from 'src/components/H1';
import { form } from './style.module.css';
import { ConfirmRow } from '../../ConfirmRow';
import { Button } from 'src/components/Button';
import { actions_buttons, confirmRowItems } from './style.module.css';

import { useSelectorTyped } from 'src/utils/hooks';

export const ConfirmInformation: FC = () => {
  // const { country, states, cities } = useSelectorTyped(
  //   (state) => state.signup.
  // );

  const handleForm = () =>{

  }
  return (
    <div className={form}>
      <H1 secondary>Confirm Information</H1>
      <div className={confirmRowItems}>
        <ConfirmRow rowName="jhghj fvdv" rowValue="huyhu 21321" />
        <ConfirmRow rowName="jhghj fvdv" rowValue="21321" />
        <ConfirmRow rowName="jhghj fvdv" rowValue="213ddddddddddd21" />
        <ConfirmRow rowName="jhgaaaaaa" rowValue="000   ddddddd21" />
      </div>

      <div className={actions_buttons}>
        <Button secondary><>Back</></Button>
        <Button onClick={handleForm} >
          <>proceed</>
        </Button>
      </div>
    </div>
  );
};
