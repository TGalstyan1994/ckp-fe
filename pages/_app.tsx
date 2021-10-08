import { ComponentType, FC } from 'react';
import { Provider } from 'react-redux';
import { AppInitialProps } from 'next/app';
import GlobalStyles from 'ui/global-styles';
import store from '../redux/index';

type Props = {
  Component: ComponentType<AppInitialProps>;
  pageProps: AppInitialProps;
};

const MyApp: FC<Props> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <GlobalStyles />
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
