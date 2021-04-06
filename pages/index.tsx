import { authorize } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { registerUser } from 'api/auth';

const IndexPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() =>
          dispatch(authorize({ login: 'jon', password: 'Jon@1234' }))
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
