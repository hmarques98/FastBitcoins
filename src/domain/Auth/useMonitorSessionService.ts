import { getMonitorSession } from '@data/auth/services'
import { useQuery } from 'react-query'

const EIGHT_SECONDS = 8000
const useMonitorSessionService = (sessionKey: string) => {
  const { data, isLoading, isFetching } = useQuery(
    ['monitorSession', sessionKey],
    () => getMonitorSession(sessionKey),
    {
      enabled: Boolean(sessionKey),
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
      refetchInterval: EIGHT_SECONDS,
    },
  )

  return { data, isLoading, isFetching }
}

export default useMonitorSessionService
