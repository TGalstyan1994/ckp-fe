import { Stages } from 'ui/components/registration/stages';
import {
  SponsorForm,
  AccountForm,
  ConfirmEmailForm,
  PersonalDetailsForm,
} from 'ui/components/registration/forms/index';
import { withAuth } from 'utils';

const RegistrationPage = () => {
  return (
    <div>
      <Stages>
        <SponsorForm />
        <AccountForm />
        <ConfirmEmailForm />
        <PersonalDetailsForm />
      </Stages>
    </div>
  );
};

export const getStaticProps = withAuth();

export default RegistrationPage;
