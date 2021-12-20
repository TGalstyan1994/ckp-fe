import { FC, ReactElement, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from 'src/store';
import { GetServerSideProps, NextPage } from 'next';
import '../src/assets/styles/main.scss';
import { requireAuthentication } from '../HOC/requireAuthentication';
import { useRouter } from 'next/router';
import { getAccessToken } from '../src/utils';

type Page<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppProps & {
  Component: Page
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  const router = useRouter();
  useEffect(() => {
    if (getAccessToken()) {
      router.push('/profile');
    }
  }, []);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {}
    };
  }
);

export default MyApp;
