import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { getAccessToken } from '../src/utils';

const IndexPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) {
      router.push('/profile');
    } else {
      router.push('/signin');
    }
  });

  return null;
};


export default IndexPage;
