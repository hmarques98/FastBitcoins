import { useAppSelector } from '@services/redux/Store'

const useAuthClientState = () => {
  const user = useAppSelector(state => state.user.userData)

  return { ...user }
}

export default useAuthClientState
