import { signUp as _signUp } from 'data/auth/services'
import { useCallback } from 'react'
import { useMutation } from 'react-query'
import useAuthClientState from './useAuthClientState'

const useSignUpService = () => {
  const {
    email,
    alphaCountryCode,
    stateCode: countryStateCode,
  } = useAuthClientState()
  const { mutateAsync, data, isError, isLoading } = useMutation(_signUp)

  const signUp = useCallback(async () => {
    await mutateAsync({
      country: alphaCountryCode,
      email,
      countryState: countryStateCode,
    })
  }, [alphaCountryCode, countryStateCode, email, mutateAsync])

  return { data, isError, isLoading, signUp }
}

export default useSignUpService
