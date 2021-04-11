import { PayloadAction } from '@reduxjs/toolkit';
import { UserData } from 'interfaces';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authorize } from 'redux/auth/thunks';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <input value={login} onChange={({ target }) => setLogin(target.value)} />
      <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button>enter</button>
      <button
        onClick={() =>
          dispatch(authorize({ login: 'jon', password: 'Jon@1234' })).then(
            ({ payload }: PayloadAction<UserData>) =>
              (document.cookie = `auth=${payload.access_token}; path=/`)
          )
        }
      >
        авторизоваться
      </button>
    </div>
  );
};

export default LoginPage;
