import { Stages } from 'components/registration/stages';
import { SponsorForm } from 'components/registration/forms/sponsor';
import { withAuth } from 'utils';

const RegistrationPage = () => {
  return (
    <div>
      <Stages>
        <SponsorForm />
      </Stages>
    </div>
  );
};

export const getStaticProps = withAuth();

export default RegistrationPage;
