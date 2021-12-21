import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx

    const notRequiredRouts = ['/signin', '/signup']

    if (req.cookies) {
      const token = req.cookies.access_token
      if (token && req.url && notRequiredRouts.includes(req.url)) {
        return {
          redirect: {
            permanent: false,
            destination: '/profile',
          },
        }
      }
    }
    return gssp(ctx)
  }
}
