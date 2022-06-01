import { IUser } from '@services/models'
import {
  setUserData,
  resetUserData,
} from '@services/redux/slices/user/UserReducers'
import { useAppDispatch, useAppSelector } from '@services/redux/Store'
import { useCallback } from 'react'

const useUserService = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.userData)

  const setUser = useCallback(
    (userData: IUser) => {
      dispatch(setUserData(userData))
    },
    [dispatch],
  )

  const resetUser = () => {
    dispatch(resetUserData())
  }

  return {
    setUser,
    resetUser,
    user,
  }
}

export default useUserService
