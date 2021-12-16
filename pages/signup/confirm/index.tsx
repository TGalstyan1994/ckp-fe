import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router'
import { sendVerificationCode } from '../../../src/managers/signup';

const Confirm: FC = () => {
  const router = useRouter();

  const verifyUser = async () => {
    try {
      const { code } = router.query;
      if (code) {
        const payload = { code: code };
        await sendVerificationCode(payload)
        Router.push('/profile')
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    verifyUser()
  }, [router.query]);

  return (
    <>
    </>
  );
};


export default Confirm;
