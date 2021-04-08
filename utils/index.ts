import { NextPageContext } from 'next';
import Router from 'next/router';

export const getCookie = (name: string): string | boolean => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([$()*+./?[\\\]^{|}])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : false;
};

export function redirectUser(context: NextPageContext, location: string) {
  if (context.res) {
    context.res.writeHead(302, { Location: location });
    context.res.end();
  } else {
    Router.push(location);
  }
}
