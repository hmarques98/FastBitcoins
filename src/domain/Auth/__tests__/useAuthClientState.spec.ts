import { renderHook, act } from '@testing-library/react-hooks'
import useAuthClientState from '../useAuthClientState'
import { useAuthContext } from '../AuthContext'
import { getStorageValueUserSession } from 'data/auth/services'
import { IStorageUserSession } from 'data/auth/services/models'

const mockSetStorageValueSessionKey = jest.fn()
jest.mock('data/auth/services', () => {
  return {
    getStorageValueSessionKey: jest.fn().mockResolvedValue('123'),
    getStorageValueUserSession: jest.fn().mockResolvedValue({
      secret: '123',
    }),
    setStorageValueSessionKey: (val: IStorageUserSession) =>
      mockSetStorageValueSessionKey(val),
  }
})

jest.mock('../AuthContext')

const useAuthContextMock = useAuthContext as jest.MockedFunction<
  typeof useAuthContext
>
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
describe('useAuthClientState', () => {
  describe('sessionKeyState', () => {
    it('SHOULD sessionKey state to start with a empty string', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useAuthClientState(),
      )

      expect(result.current.sessionKey).toBe('')
      await waitForNextUpdate()
    })
    it('SHOULD change value after get value from storage', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useAuthClientState(),
      )

      expect(result.current.sessionKey).toBe('')

      await waitForNextUpdate()

      expect(result.current.sessionKey).toBe('123')
    })
  })

  describe('isAuthState', () => {
    it('SHOULD isAuth state to start with an undefined value', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useAuthClientState(),
      )

      expect(result.current.isUserAuthenticated).toBeUndefined()
      await waitForNextUpdate()
    })

    it('SHOULD isAuth state to be truthy WHEN get userSession value from storage', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useAuthClientState(),
      )

      expect(result.current.isUserAuthenticated).toBeUndefined()
      await waitForNextUpdate()

      expect(result.current.isUserAuthenticated).toBeTruthy()
    })

    describe('WHEN isAuthenticated from AuthContext is false', () => {
      describe('AND getStorageValueUserSession there is no userSession in storage ', () => {
        it('SHOULD isUserAuthenticated to be false', async () => {
          useAuthContextMock.mockReturnValueOnce({ isAuthenticated: false })
          getStorageValueUserSessionMock.mockResolvedValueOnce(null)
          const { result, waitForNextUpdate } = renderHook(() =>
            useAuthClientState(),
          )

          expect(result.current.isUserAuthenticated).toBeUndefined()
          await waitForNextUpdate()

          expect(result.current.isUserAuthenticated).toBeFalsy()
        })
      })
    })
  })

  describe('authenticateSession', () => {
    describe('SHOULD call authenticateSession', () => {
      describe('AND setStorageValueSessionKey correctly', () => {
        it('AND after value has been save locally SHOULD call isUserAuthenticated TO BE true', async () => {
          const { result, waitForNextUpdate } = renderHook(() =>
            useAuthClientState(),
          )

          expect(mockSetStorageValueSessionKey).not.toHaveBeenCalled()
          expect(result.current.isUserAuthenticated).toBeFalsy()

          await waitForNextUpdate()
          act(() => {
            result.current.authenticateSession(authenticateMockPayload)
          })

          expect(mockSetStorageValueSessionKey).toHaveBeenCalledWith(
            authenticateMockPayload,
          )
          expect(result.current.isUserAuthenticated).toBeTruthy()
        })
      })
    })
  })
})
