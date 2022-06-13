import { useMutation } from 'react-query'
import { login, setStorageValueSessionKey } from '@data/auth/services'

const useLoginService = () => {
  const { mutateAsync, ...rest } = useMutation(login)
  const doLogin = async (email: string) => {
    const response = await mutateAsync(email)
    await setStorageValueSessionKey(response.sessionKey)

    return response
  }

  return { doLogin, ...rest }
}

export default useLoginService
