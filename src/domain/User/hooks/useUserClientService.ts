import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@services/redux/Store'
import { setEmail as _setEmail } from '@services/redux/slices/user/UserReducers'

const useUserClientService = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.userData)

  const setEmail = useCallback(
    (email: string) => {
      dispatch(_setEmail({ email }))
    },
    [dispatch],
  )

  return {
    setEmail,
    user,
  }
}

export default useUserClientService
