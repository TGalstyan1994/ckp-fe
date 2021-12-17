import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Button } from 'src/components/Button';
import { CheckBox } from 'src/components/CheckBox';
import { Input } from 'src/components/Input';
import { LinkText } from 'src/components/LinkText';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { signInAction } from 'src/store/actions/signin';
import {
  logOut,
  startStageFetching, stopFetching,
  validateForm
} from 'src/store/reducers/signin';
import { useSelectorTyped } from 'src/utils/hooks';
import { ErrorsSpan } from 'src/components/ErrorsSpan';
import {
  form,
  form_header,
  form_inputs,
  form_password_actions,
  form_buttons,
  ico_button
} from './SignInForm.module.css';
import { validate } from './validate';
import { resetSignup } from '../../../store/reducers/signup';
import { getAccessToken } from '../../../utils';

type FormState = {
  username: string
  password: string
}

export const SignInForm: FC = () => {
  const { errors, fetching, fetchingErrors, data } = useSelectorTyped(
    (state) => state.signin
  );

  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: ''
  });
  const isInitialMount = useRef(true);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const submitForm = () => {
    dispatch(startStageFetching());
    const ValidationErrors = validate(formState);
    dispatch(validateForm({ errors: ValidationErrors }));

    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(stopFetching());
      return;
    }

    dispatch(signInAction(formState));
  };

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') setRememberMe(e.target.checked);
    else
      setFormState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      dispatch(logOut());
      dispatch(resetSignup())
      if (getAccessToken()) {
        router.push('/profile')
      }
    } else {
      if (getAccessToken()) {
        router.push('/profile')
      } else if (data.accessToken) {
        router.push('/signup')
      }
    }
  }, [data.accessToken])

  return (
    <div className={form}>
      <h1 className={form_header}>Sign In.</h1>

      <div className={form_inputs}>
        <Input
          name='username'
          placeholder='Username'
          value={formState.username}
          onChange={handleFormInput}
          error={errors.username}
        />
        <Input
          name='password'
          placeholder='Password'
          value={formState.password}
          onChange={handleFormInput}
          type='password'
          error={errors.password}
        />
      </div>
      {fetchingErrors && <ErrorsSpan>{fetchingErrors}</ErrorsSpan>}

      <div className={form_password_actions}>
        <CheckBox
          checked={rememberMe}
          onChange={handleFormInput}
          label='Remember me'
          name='rememberMe'
        />
        <LinkText href='/signin/forgot_password'>
          Forgot your password ?
        </LinkText>
      </div>

      <div className={form_buttons}>
        <Button disabled={fetching} className={ico_button} onClick={submitForm}>
          Log In
        </Button>
        <Button secondary onClick={() => router.push('/signup')}>
          Create an account
        </Button>
      </div>
    </div>
  );
};
