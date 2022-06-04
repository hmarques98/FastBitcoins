import { Platform } from 'react-native'

import { instanceAPI } from '@services/http'
import {
  ILoginRequest,
  ILoginResponse,
  IMonitorSessionResponse,
  ISignUp,
  ISignUpRequest,
  PlatformEnum,
} from './models'

const platform = Platform.select({
  android: PlatformEnum.ANDROID,
  ios: PlatformEnum.IOS,
})

const getMonitorSession = async (sessionKey?: string) => {
  const response = await instanceAPI.get<IMonitorSessionResponse>(
    `/access/magic/${sessionKey}`,
  )

  return response.data
}

const login = async (email: string) => {
  const response = await instanceAPI.post<
    ILoginRequest,
    { data: ILoginResponse }
  >('/access/login', {
    ['email_address']: email,
    platform,
  })

  return response.data
}

const signUp = async ({ email, country, countryState }: ISignUp) => {
  const response = await instanceAPI.post<
    ISignUpRequest,
    { data: ISignUpRequest }
  >('/access/create', {
    ['email_address']: email,

    platform,
    language: 'en',
    country,
    state: countryState,
  })

  return response.data
}

export { getMonitorSession, login, signUp }
