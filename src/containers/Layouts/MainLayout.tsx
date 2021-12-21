import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelectorTyped } from '../../utils/hooks'
import { getAccessToken } from '../../utils'
import { useDispatch } from 'react-redux'
import { storeAccessToken } from '../../store/reducers/signin'

interface IMainLayout {
  children: JSX.Element
}

const MainLayout = ({ children }: IMainLayout) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelectorTyped((state) => state.signin)

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/signin')
    } else if (!data.accessToken) {
      dispatch(storeAccessToken(getAccessToken()))
    }
  }, [data.accessToken])

  return (
    <div>
      <div>header</div>
      <div>said menu</div>
      {children}
    </div>
  )
}

export default MainLayout
