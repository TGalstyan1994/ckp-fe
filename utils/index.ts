import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { ParsedUrlQuery } from 'node:querystring';
import { whiteList } from './constants';

export function isBrowser(): boolean {
  return !!typeof window;
}

export const getCookie = (name: string): string | boolean => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([$()*+./?[\\\]^{|}])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : false;
};

export const getSponsorByQuery = (query: ParsedUrlQuery): string => {
  const { sponsor } = query;

  if (sponsor) {
    return Array.isArray(sponsor) ? sponsor[0] : sponsor;
  }
  return 'admin';
};

export const withAuth = async (
  inner?: (ctx: NextPageContext) => Record<string, unknown>
) => {
  return (context: NextPageContext): Record<string, unknown> => {
    const { res, pathname } = context;
    const { auth } = cookies(context);

    if (res && !auth && !whiteList.includes(pathname)) {
      res.writeHead(301, { location: '/admin/login' });
      res.end();
    }
    return inner ? inner(context) : {};
  };
};
