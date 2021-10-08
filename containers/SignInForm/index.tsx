import classes from './SignInForm.module.css';
const {
  signin_wrapper,
  signin_head,
  signin_actions,
  password_actions_wrapper,
  password_forgot,
} = classes;

export const SignInContainer = () => {
  return (
    <div className={signin_wrapper}>
      <h1 className={signin_head}>Sign In.</h1>
      <input
      // Input
      // placeholder="Username"
      // value={login}
      // onChange={(val) => setLogin(val)}
      />
      <input
      // Input
      // placeholder="Password"
      // value={password}
      // onChange={(val) => setPassword(val)}
      // type="password"
      />
      <div className={password_actions_wrapper}>
        {/*!!!!!!!!! checkbox !!!!!!!!!!*/}
        <span className={password_forgot}>Forgot your password?</span>
      </div>

      <div className={signin_actions}>
        <button
        // Button
        // primary
        // onClick={() => {
        //   return dispatch(
        //     authorize({ login: 'jon', password: 'Jon@1234' })
        //   ).then(
        //     ({ payload }: PayloadAction<UserData>) =>
        //       (document.cookie = `auth=${payload.access_token}; path=/`)
        //   );
        // }}
        >
          LOG IN
        </button>

        <button
        // onClick={() => router.push('/signup')}
        >
          {/* Button */}
          Create an account
        </button>
      </div>
    </div>
  );
};
