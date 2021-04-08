import React, { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { AppInitialProps } from 'next/app';
import cookies from 'next-cookies';

import { redirectUser } from 'utils';
import { whiteList } from 'utils/constants';
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
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = ({ ctx }) => {
  const { auth } = cookies(ctx);

  if (!auth && !whiteList.includes(ctx.pathname)) {
    redirectUser(ctx, '/admin/login');
  }

  return {};
};

export default MyApp;
