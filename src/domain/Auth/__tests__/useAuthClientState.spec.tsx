import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useAuthClientState from '../useAuthClientState'
import AuthContextProvider from '../AuthContext'
import { getStorageValueUserSession } from 'data/auth/services'
import { IStorageUserSession } from 'data/auth/services/models'

const mockSetStorageValueUserSession = jest.fn()
jest.mock('data/auth/services', () => {
  return {
    getStorageValueSessionKey: jest.fn().mockResolvedValue('123'),
    getStorageValueUserSession: jest.fn().mockResolvedValue({
      secret: '123',
    }),
    setStorageValueUserSession: (val: IStorageUserSession) =>
      mockSetStorageValueUserSession(val),
  }
})

const getStorageValueUserSessionMock =
  getStorageValueUserSession as jest.MockedFunction<
    typeof getStorageValueUserSession
  >

const authenticateMockPayload: IStorageUserSession = {
  email: 'email@email.com',
  expired: false,
  secret: '4321',
  sessionKey: '123',
}

const setupHook = () => {
  return renderHook(() => useAuthClientState(), {
    wrapper: ({ children }) => (
      <AuthContextProvider>{children}</AuthContextProvider>
    ),
  })
}
describe('useAuthClientState', () => {
  describe('sessionKeyState', () => {
    it('SHOULD sessionKey state to start with a empty string', async () => {
      const { result, waitForNextUpdate } = setupHook()

      expect(result.current.sessionKey).toBe('')
      await waitForNextUpdate()
    })
    it('SHOULD change value after get value from storage', async () => {
      const { result, waitForNextUpdate } = setupHook()

      expect(result.current.sessionKey).toBe('')

      await waitForNextUpdate()

      expect(result.current.sessionKey).toBe('123')
    })
  })

  describe('isAuthState', () => {
    it('SHOULD isAuth state to start with an undefined value', async () => {
      const { result, waitForNextUpdate } = setupHook()

      expect(result.current.isUserAuthenticated).toBeUndefined()
      await waitForNextUpdate()
    })

    it('SHOULD isAuth state to be truthy WHEN get userSession value from storage', async () => {
      const { result, waitForNextUpdate } = setupHook()

      expect(result.current.isUserAuthenticated).toBeUndefined()
      await waitForNextUpdate()

      expect(result.current.isUserAuthenticated).toBeTruthy()
    })

    describe('WHEN isAuthenticated from AuthContext is false', () => {
      describe('AND getStorageValueUserSession there is no userSession in storage ', () => {
        it('SHOULD isUserAuthenticated to be false', async () => {
          getStorageValueUserSessionMock.mockResolvedValueOnce(null)
          const { result, waitForNextUpdate } = setupHook()

          expect(result.current.isUserAuthenticated).toBeUndefined()
          await waitForNextUpdate()

          expect(result.current.isUserAuthenticated).toBeFalsy()
        })
      })
    })
  })

  describe('authenticateSession', () => {
    describe('SHOULD call authenticateSession', () => {
      describe('AND setStorageValueUserSession correctly', () => {
        it('AND after value has been save locally SHOULD call isUserAuthenticated TO BE true', async () => {
          const { result, waitForNextUpdate } = setupHook()

          expect(mockSetStorageValueUserSession).not.toHaveBeenCalled()
          expect(result.current.isUserAuthenticated).toBeFalsy()

          await waitForNextUpdate()
          await act(async () => {
            await result.current.authenticateSession(authenticateMockPayload)
          })

          expect(mockSetStorageValueUserSession).toHaveBeenCalledWith(
            authenticateMockPayload,
          )

          expect(result.current.isUserAuthenticated).toBeTruthy()
        })
      })
    })
  })
})
