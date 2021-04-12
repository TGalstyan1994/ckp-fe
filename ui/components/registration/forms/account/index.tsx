import React from 'react';
import { useFormik } from 'formik';
import { Input } from 'ui/components/common/input';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/thunks';
import { setEmailAction } from 'redux/registration';

interface IAccountForm {
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
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

  console.log(errors);
  return error ? errors : {};
};

const AccountForm: React.FC = () => {
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
      console.log(values);
      dispatch(register(values));
    },
  });

  const handleChangeEmail = (val: string) => {
    formik.setFieldValue('email', val);
    dispatch(setEmailAction(val));
  };

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
        onChange={(val: string) => formik.setFieldValue('confirmPassword', val)}
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
      <button
        type="submit"
        // onClick={() => {
        //   dispatch(
        //     register({
        //       login: 'qwerty',
        //       email: 'qwerty@qwerty.com',
        //       password: 'qwerty1',
        //     })
        //   );
        // }}
      >
        continue
      </button>
    </form>
  );
};

export default AccountForm;
