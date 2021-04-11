import { Stages } from 'ui/components/registration/stages';
import SponsorForm from 'ui/components/registration/forms/sponsor';
import { withAuth } from 'utils';
import AccountForm from 'ui/components/registration/forms/account';

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
