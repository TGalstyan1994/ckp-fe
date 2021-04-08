import { authorize } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { registerUser } from 'api/auth';
import { UserData } from 'interfaces/index';
import { PayloadAction } from '@reduxjs/toolkit';

const IndexPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
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
      <button
        onClick={() => {
          registerUser('jon', 'jon.snow.2021-03-21@mailinator.com', 'Jon@1234');
        }}
      >
        зарегистрироваться
      </button>
    </div>
  );
};

export default IndexPage;
