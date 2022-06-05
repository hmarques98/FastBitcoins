import { useAppSelector } from '@services/redux/Store'
import { getStorageValueSessionKey } from 'data/auth/services'
import { useEffect, useState } from 'react'

const useAuthClientState = () => {
  const user = useAppSelector(state => state.user.userData)
  const [sessionKey, setSessionKey] = useState('')

  useEffect(() => {
    ;(async () => {
      const value = await getStorageValueSessionKey()
      if (value) setSessionKey(value)
    })()
  }, [])

  return { ...user, sessionKey }
}

export default useAuthClientState
