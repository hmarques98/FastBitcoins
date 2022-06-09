import {
  getStorageValueSessionKey,
  getStorageValueUserSession,
  setStorageValueUserSession,
} from '@data/auth/services'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from './AuthContext'

const useAuthClientState = () => {
  const [sessionKey, setSessionKey] = useState('')
  const { isAuthenticated, setIsAuthenticated } = useAuthContext() || {}

  useEffect(() => {
    ;(async () => {
      const value = await getStorageValueSessionKey()
      if (value) setSessionKey(value)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const value = await getStorageValueUserSession()

      setIsAuthenticated(Boolean(value?.secret))
    })()
  }, [setIsAuthenticated])

  const authenticateSession = useCallback(
    async ({
      expired,
      secret,
      email,
    }: {
      expired: boolean
      secret: string
      email: string
    }) => {
      await setStorageValueUserSession({
        email,
        expired,
        secret,
        sessionKey,
      })

      setIsAuthenticated?.(true)
    },
    [sessionKey, setIsAuthenticated],
  )

  const isUserAuthenticated = useMemo(() => isAuthenticated, [isAuthenticated])

  return { sessionKey, isUserAuthenticated, authenticateSession }
}

export default useAuthClientState
