import { Stages } from 'components/registration/stages';
import SponsorForm from 'components/registration/forms/sponsor';
import { withAuth } from 'utils';
import AccountForm from 'components/registration/forms/account';

const RegistrationPage = () => {
  return (  
    <div>
      <Stages>
        <SponsorForm />
        <AccountForm />
      </Stages>
    </div>
  );
};

export const getStaticProps = withAuth();

export default RegistrationPage;
