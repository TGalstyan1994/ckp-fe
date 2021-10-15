import { FC, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import GlobalStyles from 'ui/global-styles'
import { store } from 'redux/index'
import { NextPage } from 'next'

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppProps & {
  Component: Page
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)
  return (
    <Provider store={store}>
      <GlobalStyles />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  )
}

export default MyApp
