import { Button } from 'src/components/Button';
import { H1 } from 'src/components/H1';
import { PinInput } from 'src/components/PinInput';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendPinAction } from 'src/store/actions/signup';
import {
  endStageFetching,
  startStageFetching,
  validateStage
} from 'src/store/reducers/signup';
import { haveErrors } from 'src/utils';
import { useSelectorTyped } from 'src/utils/hooks';
import { form, form_buttons, form_fetching_error } from './style.module.css';
import vector from 'src/UI/Vector.svg'
import { validate } from './validation';

export const CreateSecurityPin: FC = () => {
  const stage = useSelectorTyped((state) => state.signup.stages[1]);
  const [pinForm, setPin] = useState({
    pin: '',
    confirmPin: ''
  });

  const dispatch = useDispatch();

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value || e.target.value === '')
      setPin((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  const handleForm = () => {
    dispatch(startStageFetching());

    const validationErrors = validate(pinForm);
    dispatch(validateStage({ errors: validationErrors }));

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching());
      return;
    }

    dispatch(sendPinAction(pinForm));
  };

  return (
    <div className={form}>
      <H1 secondary>Create security PIN.</H1>
      <PinInput
        onChange={handlePin}
        value={pinForm.pin}
        error={stage.errors?.pin}
        name='pin'
      />
      <PinInput
        onChange={handlePin}
        value={pinForm.confirmPin}
        error={stage.errors?.confirmPin}
        placeholder='Confirm PIN'
        name='confirmPin'
        confirm
      />
      {stage.fetchError && (
        <span className={form_fetching_error}>{stage.fetchError}</span>
      )}
      <div className={form_buttons}>
        <Button onClick={handleForm} disabled={stage.fetching}>
          <>Continue</>
          <img src={vector} alt='vector' />
        </Button>
      </div>
    </div>
  );
};