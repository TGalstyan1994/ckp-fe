import { useRouter } from 'next/router';
import { getAccessToken } from '../utils';

export const AuthCheck = (props: any) => {
  const router = useRouter();
  if (typeof window !== 'undefined' && getAccessToken() === null) router.push('/signin');

  return props.children;
};