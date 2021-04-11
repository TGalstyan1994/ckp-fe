import { PayloadAction } from '@reduxjs/toolkit';
import { UserData } from 'interfaces';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authorize } from 'redux/auth/thunks';
import { Input } from 'ui/components/common/input';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  return (
    <div>
      <Input
        placeholder="Username"
        value={login}
        onChange={(val) => setLogin(val)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(val) => setPassword(val)}
        type="password"
      />
      <button
        onClick={() =>
          dispatch(authorize({ login: 'jon', password: 'Jon@1234' })).then(
            ({ payload }: PayloadAction<UserData>) =>
              (document.cookie = `auth=${payload.access_token}; path=/`)
          )
        }
      >
        signin
      </button>
      <button onClick={() => router.push('/signup')}>signup</button>
    </div>
  );
};

export default LoginPage;
