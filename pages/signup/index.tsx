import { Stages } from 'ui/components/registration/stages';
import {
  SponsorForm,
  AccountForm,
  ConfirmEmailForm,
  PersonalDetailsForm,
  PaymentDetailsForm,
} from 'ui/components/registration/forms/index';
import { withAuth } from 'utils';
import ConfirmInformationForm from 'ui/components/registration/forms/confirmInformationForm';

const RegistrationPage = () => {
  return (
    <>
      <Stages>
        <SponsorForm />
        <AccountForm />
        <ConfirmEmailForm />
        <PersonalDetailsForm />
        <PaymentDetailsForm />
        <ConfirmInformationForm />
      </Stages>
    </>
  );
};

export const getStaticProps = withAuth();

export default RegistrationPage;
