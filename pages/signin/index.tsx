import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { PayloadAction } from '@reduxjs/toolkit';
// import { UserData } from 'interfaces';
// import { authorize } from 'redux/auth/thunks';
// import { Input } from 'ui/components/common/input';
import { useRouter } from 'next/router';
// import sideImage from '../../bg.svg';
// import logo from '../../logo.svg';
// import {
//   LoginContainer,
//   LoginPageContainer,
//   Logo,
//   WelcomeSideImage,
// } from './styled';
// import { some_new } from './some.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  return (
    <></>
    // <LoginPageContainer>
    //   <Logo src={logo} />
    //   <LoginContainer></LoginContainer>
    //   <WelcomeSideImage src={sideImage} />
    // </LoginPageContainer>
  );
};

export default LoginPage;
