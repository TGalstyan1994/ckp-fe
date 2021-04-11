import React from 'react';
import { useFormik } from 'formik';
import { registerUser } from 'api/auth';
import { Input } from 'components/common/input';

interface IAccountForm {
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const validateLogin = (value: string) =>
  value.length < 2 ? 'Min Number of characters - 2' : '';

const validatePassword = (value: string): string =>
  value.length < 5 ? 'Min Number of characters - 5' : '';

const validateEmail = (value: string): string =>
  /[\dA-Za-z]{3,}@[\dA-Za-z]{2,}.[\dA-Za-z]{2,}/.test(value)
    ? 'Mask: aaa@bb.cc'
    : '';

const validate = (values: IAccountForm) => {
  const errors: IAccountForm = {
    login: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  if (values.login.length < 2) {
    errors.login = 'Min Number of characters - 2';
  }

  if (values.password.length < 5) {
    errors.password = 'Min Number of characters - 5';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Confirm Password Mismatch';
  }

  if (/[\dA-Za-z]{3,}@[\dA-Za-z]{2,}.[\dA-Za-z]{2,}/.test(values.email)) {
    errors.email = 'Mask: aaa@bb.cc';
  }

  return errors;
};

const AccountForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validate,
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <input
        placeholder="password"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? (
        <span>{formik.errors.password}</span>
      ) : undefined}

      <input
        placeholder="confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      {formik.errors.confirmPassword ? (
        <span>{formik.errors.confirmPassword}</span>
      ) : undefined}

      <input
        placeholder="email"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <span>{formik.errors.email}</span> : undefined}

      <button type="submit">continue</button>
    </form>
  );
};

export default AccountForm;
