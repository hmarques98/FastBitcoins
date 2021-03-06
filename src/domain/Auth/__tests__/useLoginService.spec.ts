import { act } from 'react-test-renderer'
import { renderHook } from 'utils/testUtils'
import useLoginService from '../useLoginService'

const mockLogin = jest.fn()
const mockSetStorageValueSessionKey = jest.fn()
jest.mock('@data/auth/services', () => {
  return {
    login: (email: string) => mockLogin(email),
    setStorageValueSessionKey: (sessionKey: string) =>
      mockSetStorageValueSessionKey(sessionKey),
  }
})

const EMAIL = 'email@email.com'

describe('useLoginService', () => {
  it('SHOULD return correct values', async () => {
    mockLogin.mockResolvedValue({
      sessionKey: '1234',
      newAccount: false,
      reactivation: false,
    })
    const { result, waitFor } = renderHook(() => useLoginService())

    await act(async () => {
      result.current.doLogin(EMAIL)
      await waitFor(() => !result.current.isLoading)

      expect(result.current.isLoading).toBeTruthy()
    })
    expect(mockLogin).toHaveBeenCalledWith(EMAIL)
    expect(mockSetStorageValueSessionKey).toHaveBeenCalledWith('1234')
    expect(result.current.data).toEqual({
      sessionKey: '1234',
      newAccount: false,
      reactivation: false,
    })
  })
})
