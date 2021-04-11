import { authorize } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { registerUser } from 'api/auth';
import { UserAuthData, UserData } from 'interfaces/index';
import { PayloadAction } from '@reduxjs/toolkit';
import { withAuth } from 'utils';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData: UserAuthData = {
    login: 'jon',
    email: 'jon.snow.2021-03-21@mailinator.com',
    password: 'Jon@1234',
  };
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
          router.push('/signup');
        }}
      >
        зарегистрироваться
      </button>
    </div>
  );
};

export const getServerSideProps = withAuth();

export default IndexPage;
