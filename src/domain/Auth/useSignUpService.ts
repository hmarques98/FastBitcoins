import {
  setStorageValueSessionKey,
  signUp as _signUp,
} from '@data/auth/services'
import useUserClientState from '@domain/User/useUserClientState'
import { useCallback } from 'react'
import { useMutation } from 'react-query'

const useSignUpService = () => {
  const {
    user: { email, alphaCountryCode, stateCode: countryStateCode },
  } = useUserClientState()

  const { mutateAsync, data, isError, isLoading } = useMutation(_signUp)

  const signUp = useCallback(async () => {
    const response = await mutateAsync({
      country: alphaCountryCode,
      email,
      countryState: countryStateCode,
    })
    await setStorageValueSessionKey(response.sessionKey)
  }, [alphaCountryCode, countryStateCode, email, mutateAsync])

  return { data, isError, isLoading, signUp }
}

export default useSignUpService
