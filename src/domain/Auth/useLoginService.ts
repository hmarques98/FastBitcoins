import { login } from 'data/auth/services'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import useAuthClientState from './useAuthClientState'

const useLoginService = () => {
  const { email } = useAuthClientState()
  const { mutateAsync, data, isError, isLoading } = useMutation(login)

  useEffect(() => {
    mutateAsync(email)
  }, [email, mutateAsync])

  return { data, isError, isLoading }
}

export default useLoginService
