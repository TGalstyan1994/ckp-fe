import { withAuth } from 'src/utils';
import { SignUpStages } from 'src/containers/Layouts/SignUpLayout';
import { AccountDetails } from 'src/containers/SignUp/AccountDetails';
import { CreateSecurityPin } from 'src/containers/SignUp/CreateSecurityPin';
import { SecurityQuestion } from 'src/containers/SignUp/SecurityQuestion';
import Head from 'next/head';
import { FC, useEffect } from 'react';
import { PersonalDetails } from 'src/containers/SignUp/PersonalDetails';
import { PaymentDetails } from '../../src/containers/SignUp/PaymentDetails';
import { ConfirmInformation } from '../../src/containers/SignUp/ConfirmInformation';
import { finishStage } from '../../src/store/reducers/signup';
import { IRegistrationStatus } from '../../src/interfaces/signin/signin';
import { useSelectorTyped } from '../../src/utils/hooks';
import { useDispatch } from 'react-redux';
import { getGeoDetails } from '../../src/store/actions/signup';

const RegistrationPage: FC = () => {
  const captchaUrl = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_SITE_KEY}`;
  const { data } = useSelectorTyped((state) => state.signin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.registrationStatus && data.accessToken) {
      const stepNames: Array<IRegistrationStatus> = ['securityCode', 'securityQuestion', 'profile', 'wallet', 'confirm'];

      dispatch(finishStage());
      stepNames.find((step: IRegistrationStatus) => {
        if (!data.registrationStatus[step]) {
          return;
        } else {
          dispatch(finishStage());
        }
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(getGeoDetails())
  }, [])

  return (
    <>
      <Head>
        <script defer src={captchaUrl} />
      </Head>
      <SignUpStages>
        <AccountDetails />
        <CreateSecurityPin />
        <SecurityQuestion />
        <PersonalDetails />
        <PaymentDetails />
        <ConfirmInformation />
      </SignUpStages>
    </>
  );
};

export const getStaticProps = withAuth();

export default RegistrationPage;
