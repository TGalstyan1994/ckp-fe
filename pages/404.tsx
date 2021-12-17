import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAccessToken } from '../src/utils';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) {
      router.push('/profile')
    } else {
      router.push('/')
    }
  }, [])

  return null
}