import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@services/redux/Store'
import {
  setEmail as _setEmail,
  resetUser as _resetUser,
} from '@services/redux/slices/user/UserReducer'

const useUserClientState = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  const setEmail = useCallback(
    (email: string) => {
      dispatch(_setEmail({ email }))
    },
    [dispatch],
  )

  const resetUser = useCallback(() => {
    dispatch(_resetUser())
  }, [dispatch])

  return {
    setEmail,
    user,
    resetUser,
  }
}

export default useUserClientState
