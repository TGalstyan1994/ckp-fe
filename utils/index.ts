import { NextPageContext } from 'next'
import cookies from 'next-cookies'
import { whiteList } from './constants'

export function isBrowser(): boolean {
  return !!typeof window
}

export const getSponsorByQuery = (): string => ''

export const withAuth = (
  inner?: (ctx: NextPageContext) => Record<string, unknown>
) => {
  return async (context: NextPageContext): Promise<Record<string, unknown>> => {
    const { res, pathname } = context
    const { auth } = cookies(context)

    if (res && !auth && !whiteList.includes(pathname)) {
      res.writeHead(302, { location: '/signin' })
      res.end()
    }
    return inner ? inner(context) : { props: {} }
  }
}

export const haveErrors = (ErrorObject: Record<string, string>): boolean => {
  if (!Object.values(ErrorObject).every((elem) => elem === '')) return true
  return false
}

export const getAccessToken = (): string | null =>
  localStorage.getItem('access_token')

export const removeToken = (): void => localStorage.removeItem('access_token')

export const setAccessToken = (token: string): void => {
  localStorage.setItem('access_token', token)
}
