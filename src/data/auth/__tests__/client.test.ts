import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  getStorageValueSessionKey,
  getStorageValueUserSession,
  setStorageValueSessionKey,
  setStorageValueUserSession,
} from '../services/client'
import { IStorageUserSession } from '../services/models'

const mockUser: IStorageUserSession = {
  email: 'email@email.com',
  expired: false,
  secret: '4321',
  sessionKey: '1234',
}

describe('auth/client', () => {
  describe('SHOULD return null from local storage', () => {
    it('WHEN session key does not exist in local storage', async () => {
      const value = await getStorageValueSessionKey()

      expect(AsyncStorage.getItem).toBeCalledWith('@STORAGE_KEY_SIGNUP')
      expect(value).toBeNull()
    })

    it('WHEN user session does not exist in local storage', async () => {
      const value = await getStorageValueUserSession()

      expect(AsyncStorage.getItem).toBeCalledWith('@STORAGE_KEY_USER_SESSION')
      expect(value).toBeNull()
    })
  })

  describe('SHOULD get value from local storage', () => {
    it('WHEN session key value exist in local storage', async () => {
      await setStorageValueSessionKey('123')
      const value = await getStorageValueSessionKey()

      expect(AsyncStorage.getItem).toBeCalledWith('@STORAGE_KEY_SIGNUP')
      expect(value).toBe('123')
    })

    it('WHEN user session value exist in local storage', async () => {
      await setStorageValueUserSession(mockUser)
      const value = await getStorageValueUserSession()

      expect(AsyncStorage.getItem).toBeCalledWith('@STORAGE_KEY_USER_SESSION')
      expect(value).toEqual(mockUser)
    })
  })

  describe('SHOULD save value in local storage', () => {
    it('WHEN call setStorageValueSessionKey', async () => {
      await setStorageValueSessionKey('123')
      expect(AsyncStorage.setItem).toBeCalledWith('@STORAGE_KEY_SIGNUP', '123')
    })

    it('WHEN call setStorageValueUserSession', async () => {
      await setStorageValueUserSession(mockUser)
      expect(AsyncStorage.setItem).toBeCalledWith(
        '@STORAGE_KEY_USER_SESSION',
        JSON.stringify(mockUser),
      )
    })
  })
})
