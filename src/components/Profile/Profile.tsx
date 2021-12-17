import withPrivateRoute from '../../utils/WhitPrivatRoute';

const Profile = () => {
  return(
    <div>asdas</div>
  )
}

Profile.getInitialProps = async ({req}:any) => {
  console.log(req);
  return {};
};

export default withPrivateRoute(Profile);