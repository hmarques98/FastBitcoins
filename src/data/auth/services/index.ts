import { Platform } from 'react-native'

import { instanceAPI } from '@services/http'
import {
  ILoginRequest,
  ILoginResponse,
  IMonitorSessionResponse,
  ISignUp,
  ISignUpRequest,
  ISignUpResponse,
  IStorageUserSession,
  PlatformEnum,
} from './models'
import { getStorageValue, setStorageValue } from '@services/localStorage'

const STORAGE_KEY_SIGNUP = '@STORAGE_KEY_SIGNUP'
export const STORAGE_KEY_SESSION = '@STORAGE_KEY_SESSION'

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

  await setStorageValue(STORAGE_KEY_SIGNUP, response.data.session_key)

  return response.data
}

const signUp = async ({ email, country, countryState }: ISignUp) => {
  const response = await instanceAPI.post<
    ISignUpRequest,
    { data: ISignUpResponse }
  >('/access/create', {
    ['email_address']: email,

    platform,
    language: 'en',
    country,
    state: countryState,
  })

  await setStorageValue(STORAGE_KEY_SIGNUP, response.data.session_key)

  return response.data
}

const getStorageValueSessionKey = async () =>
  await getStorageValue(STORAGE_KEY_SIGNUP)

const getStorageValueUserSession =
  async (): Promise<IStorageUserSession | null> => {
    const value = await getStorageValue(STORAGE_KEY_SESSION)
    return value ? JSON.parse(value) : null
  }

const setStorageValueSessionKey = async ({
  email,
  expired,
  secret,
  sessionKey,
}: IStorageUserSession) => {
  await setStorageValue(STORAGE_KEY_SESSION, {
    email,
    expired,
    secret,
    sessionKey,
  })
}

export {
  getMonitorSession,
  login,
  signUp,
  getStorageValueSessionKey,
  getStorageValueUserSession,
  setStorageValueSessionKey,
}
