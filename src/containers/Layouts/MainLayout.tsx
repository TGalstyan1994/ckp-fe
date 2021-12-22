import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from '../../utils/hooks'
import { getAccessToken } from '../../utils'
import { storeAccessToken } from '../../store/reducers/signin'

interface IMainLayout {
  children: JSX.Element
}

const MainLayout = ({ children }: IMainLayout) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelectorTyped((state) => state.signin)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/signin')
    } else {
      if (!data.accessToken) {
        dispatch(storeAccessToken(getAccessToken()))
      }
      setLoading(false)
    }
  }, [data.accessToken])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div>header</div>
      <div>said menu</div>
      {children}
    </div>
  )
}

export default MainLayout
