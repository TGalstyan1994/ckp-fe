import { Button } from 'src/components/Button';
import { H1 } from 'src/components/H1';
import { Input } from 'src/components/Input';
import { Select } from 'src/components/Select';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  endStageFetching,
  setCurrentOption,
  startStageFetching,
  validateStage
} from 'src/store/reducers/signup';
import { useSelectorTyped } from 'src/utils/hooks';
import { haveErrors } from 'src/utils';
import { sendSecurityQuestion } from 'src/store/actions/signup';
import { validate } from './validation';
import {
  form,
  form_inputs,
  form_description,
  form_buttons
} from './style.module.css';
import vector from 'src/UI/Vector.svg'


export const SecurityQuestion: FC = () => {
  const [securityAnswer, setSecurityAnswer] = useState('');
  const { options, currentOption, errors, fetching } = useSelectorTyped(
    (state) => state.signup.stages[2]
  );
  const dispatch = useDispatch();

  const setCurrentOptionCallback = (option: string) => {
    dispatch(setCurrentOption(option));
  };

  const handleAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setSecurityAnswer(e.target.value);
  };

  const handleForm = () => {
    dispatch(startStageFetching());

    const validationErrors = validate(securityAnswer, currentOption);
    dispatch(validateStage({ errors: validationErrors }));

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching());
      return;
    }
    const optionsTyped = options as { [key: string]: string };

    dispatch(
      sendSecurityQuestion({
        question: optionsTyped[currentOption || ''],
        answer: securityAnswer
      })
    );
  };

  return (
    <div className={form}>
      <H1 secondary>Security question</H1>

      <span className={form_description}>
        Create security question and write response.
      </span>

      <div className={form_inputs}>
        <Select
          placeholder='Enter the name of your first pet'
          options={options ? Object.keys(options) : []}
          currentOption={currentOption || ''}
          setCurrentOption={setCurrentOptionCallback}
        />

        <Input
          onChange={handleAnswer}
          value={securityAnswer}
          placeholder='Enter the name of your first pet'
          error={errors?.answer}
        />
      </div>
      <div className={form_buttons}>
        <Button onClick={handleForm} disabled={fetching}>
          <>Continue</>
          <img src={vector} alt='vector' />
        </Button>
      </div>
    </div>
  );
};
