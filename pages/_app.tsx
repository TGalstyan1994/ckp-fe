import React, { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { AppInitialProps } from 'next/app';
import GlobalStyles from 'ui/global-styles';
import store from '../redux/index';

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppInitialProps>;
  pageProps: AppInitialProps;
}) => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
