import { login } from 'data/auth/services'
import { useMutation } from 'react-query'

const useLoginService = () => {
  const { mutateAsync, data, isError, isLoading } = useMutation(login)
  const doLogin = async (email: string) => {
    const response = await mutateAsync(email)
    return response
  }

  return { data, isError, isLoading, doLogin }
}

export default useLoginService
