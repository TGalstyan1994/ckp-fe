import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { sendVerificationCode } from '../../../src/managers/signup/signup'

const Confirm: FC = () => {
  const router = useRouter()

  const verifyUser = async () => {
    const { code } = router.query
    if (code) {
      const payload = { code }
      await sendVerificationCode(payload)
      router.push('/profile')
    }
  }

  useEffect(() => {
    verifyUser()
  }, [router.query])

  return <></>
}

export default Confirm
