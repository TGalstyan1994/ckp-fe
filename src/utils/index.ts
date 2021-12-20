import { useSelectorTyped } from './hooks';

export const getSponsorByQuery = (): string => '';

export const haveErrors = (ErrorObject: Record<string, string>): boolean => {
  return !Object.values(ErrorObject).every((elem) => elem === '');
};

export const getAccessToken = (): string | null => {
  let nameEQ = 'access_token=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeToken = (): void => {
  document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const setAccessToken = (token: string): void => {
  let expires = '';
  var date = new Date();
  date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
  expires = '; expires=' + date.toUTCString();
  document.cookie = 'access_token=' + (token || '') + expires + '; path=/';
};
