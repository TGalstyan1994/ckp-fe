import React from 'react';
import { useFormik } from 'formik';
import { Input } from 'ui/components/common/input';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/thunks';
import { setEmailAction } from 'redux/registration';
import { Button } from 'ui/components/common/button';
import {
  FormStyled,
  Container,
  H1Styled,
  InputsContainer,
  ButtonsContainer,
} from './styled';

interface IAccountForm {
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface IForm {
  handleNextStage: () => void;
  handlePrevStage: () => void;
}

const validate = (values: IAccountForm) => {
  const errors: IAccountForm = {
    login: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  let error = false;

  if (values.login.length < 2) {
    errors.login = 'Min Number of characters - 2';
    error = true;
  }

  if (values.password.length < 5) {
    errors.password = 'Min Number of characters - 5';
    error = true;
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Confirm Password Mismatch';
    error = true;
  }

  if (!/[\dA-Za-z]{3,}@[\dA-Za-z]{2,}.[\dA-Za-z]{2,}/.test(values.email)) {
    errors.email = 'Mask: aaa@bb.cc';
    error = true;
  }
  return error ? errors : {};
};

const AccountForm: React.FC<IForm> = ({
  handleNextStage,
  handlePrevStage,
}: IForm) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validate,
    onSubmit: (values) => {
      validate(values);
      dispatch(register(values)).then(() => handleNextStage());
    },
  });

  const handleChangeEmail = (val: string) => {
    formik.setFieldValue('email', val);
    dispatch(setEmailAction(val));
  };

  return (
    <Container>
      <FormStyled>
        <H1Styled>Account Details</H1Styled>
        <InputsContainer onSubmit={formik.handleSubmit}>
          <Input
            placeholder="login"
            id="login"
            name="login"
            type="text"
            onChange={(val: string) => formik.setFieldValue('login', val)}
            value={formik.values.login}
            required
            label="login"
            error={formik.errors.login}
          />
          <Input
            placeholder="password"
            id="password"
            name="password"
            type="password"
            onChange={(val: string) => formik.setFieldValue('password', val)}
            value={formik.values.password}
            required
            label="password"
            error={formik.errors.password}
          />
          <Input
            placeholder="confirm password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={(val: string) =>
              formik.setFieldValue('confirmPassword', val)
            }
            value={formik.values.confirmPassword}
            required
            label="Confirm password"
            error={formik.errors.confirmPassword}
          />
          <Input
            placeholder="email"
            id="email"
            name="email"
            type="email"
            onChange={(val: string) => formik.setFieldValue('email', val)}
            value={formik.values.email}
            required
            label="email"
            error={formik.errors.email}
            onBlur={({ target }) => handleChangeEmail(target.value)}
          />
        </InputsContainer>
        <ButtonsContainer>
          <Button onClick={() => handlePrevStage()}>BACK</Button>
          <Button primary onClick={() => formik.handleSubmit}>
            CONTINUE
          </Button>
        </ButtonsContainer>
      </FormStyled>
    </Container>
  );
};

export default AccountForm;
