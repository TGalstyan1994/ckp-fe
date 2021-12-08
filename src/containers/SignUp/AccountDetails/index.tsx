import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeStage,
  endStageFetching,
  startStageFetching,
  validateStage
} from 'src/store/reducers/signup';
import { registerAction } from 'src/store/actions/signup';
import { Button } from 'src/components/Button';
import { H1 } from 'src/components/H1';
import { Input } from 'src/components/Input';
import { useSelectorTyped } from 'src/utils/hooks';
import { ErrorsSpan } from 'src/components/ErrorsSpan';
import { validate } from './validate';
import { form, form_inputs, form_buttons } from './style.module.css';
import { IRegistrationStatus } from '../../../interfaces/signin/signin';
import { useRouter } from 'next/router';

export const AccountDetails: FC = () => {
  const stage = useSelectorTyped((state) => state.signup.stages[0]);
  const { data } = useSelectorTyped(
    (state) => state.signin
  );
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const dispatch = useDispatch();
  const handleOnClick = async (e: MouseEvent) => {
    e.preventDefault();
    dispatch(startStageFetching());
    const ValidationErrors = validate(formState);
    dispatch(validateStage({ errors: ValidationErrors }));

    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(endStageFetching());
      return;
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_SITE_KEY,
          { action: 'submit' }
        );
        dispatch(registerAction({ ...formState, token }));
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    if (data.registrationStatus && data.accessToken) {
      let signUpStep = 0;

      const stepNames: Array<IRegistrationStatus> = ['securityCode', 'securityQuestion', 'profile', 'confirm'];
      stepNames.find((step: IRegistrationStatus, index: number) => {
        if (!data.registrationStatus[step]) {
          return signUpStep = index + 1;
        }
      });
      dispatch(changeStage(signUpStep));
    }
  }, [data]);

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form className={form}>
      <H1 secondary>Account Details</H1>
      <div className={form_inputs}>
        <Input
          name='username'
          onChange={handleFormInput}
          value={formState.username}
          label='Username'
          required
          placeholder='Enter Username'
          error={stage.errors?.username}
        />
        <Input
          type='email'
          name='email'
          onChange={handleFormInput}
          value={formState.email}
          label='E-mail Address'
          required
          placeholder='Enter E-mail Address'
          error={stage.errors?.email}
        />
      </div>
      <div className={form_inputs}>
        <Input
          type='password'
          name='password'
          onChange={handleFormInput}
          value={formState.password}
          label='Password'
          required
          placeholder='Enter Password'
          error={stage.errors?.password}
        />
        <Input
          type='password'
          name='passwordConfirmation'
          onChange={handleFormInput}
          value={formState.passwordConfirmation}
          label='Confirm Password'
          required
          placeholder='Enter Password Again'
          error={stage.errors?.passwordConfirmation}
        />
      </div>
      {stage.fetchError && <ErrorsSpan>{stage.fetchError}</ErrorsSpan>}

      <div className={form_buttons}>
        <Button onClick={handleOnClick} disabled={stage.finished}>
          Continue
        </Button>
      </div>
    </form>
  );
};
