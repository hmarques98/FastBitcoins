import { getMonitorSession } from 'data/auth/services'
import { useQuery } from 'react-query'

const useMonitorSessionService = (sessionKey: string) => {
  const query = useQuery(
    ['monitorSession', sessionKey],
    () => getMonitorSession(sessionKey),
    {
      enabled: Boolean(sessionKey),
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
      refetchInterval: 15000,
    },
  )

  return query
}

export default useMonitorSessionService
