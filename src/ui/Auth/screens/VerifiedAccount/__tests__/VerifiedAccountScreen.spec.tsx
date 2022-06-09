import React from 'react'

import VerifiedAccountScreen from '../VerifiedAccountScreen'

import { render, fireEvent } from 'utils/testUtils'
import useMonitorSessionService from '@domain/Auth/useMonitorSessionService'
import { useNavigation } from '@mocks/@react-navigation/native'

const mockAuthenticateSession = jest.fn()
jest.mock('@domain/Auth/useAuthClientState', () =>
  jest.fn(() => {
    return {
      sessionKey: '123',
      isUserAuthenticated: false,
      authenticateSession: mockAuthenticateSession,
    }
  }),
)

const mockResetUser = jest.fn()
jest.mock('@domain/User/useUserClientState', () =>
  jest.fn(() => {
    return {
      resetUser: mockResetUser,
      user: {
        email: 'email@email.com',
      },
    }
  }),
)
jest.mock('@domain/Auth/useMonitorSessionService', () =>
  jest.fn(() => {
    return {
      data: {
        expired: false,
        secret: '',
      },
      isLoading: true,
      isFetching: false,
    }
  }),
)

const mockUseMonitorSessionService =
  useMonitorSessionService as jest.MockedFunction<
    typeof useMonitorSessionService
  >
const setupScreen = () => {
  return render(<VerifiedAccountScreen />)
}

describe('VerifiedAccountScreen', () => {
  it('SHOULD render loading correctly', () => {
    const { queryByText } = setupScreen()
    expect(queryByText('Loading...')).toBeTruthy()
  })

  it('SHOULD render screen with Verified email feedback', async () => {
    jest.useFakeTimers()

    mockUseMonitorSessionService.mockReturnValue({
      data: {
        expired: false,
        secret: '123',
      },
      isLoading: false,
      isFetching: false,
    })
    const { queryByText } = setupScreen()
    expect(queryByText('Email verified')).toBeTruthy()
    expect(queryByText('Please wait while we redirect you')).toBeTruthy()
    jest.runAllTimers()

    expect(mockAuthenticateSession).toHaveBeenCalledWith({
      email: 'email@email.com',
      expired: false,
      secret: '123',
    })
  })

  it('SHOULD render screen with Pending email feedback', () => {
    mockUseMonitorSessionService.mockReturnValue({
      data: {
        expired: false,
        secret: '',
      },
      isLoading: false,
      isFetching: false,
    })
    const { queryByText } = setupScreen()
    expect(queryByText('Verify your email')).toBeTruthy()
    expect(queryByText('Please check your emails')).toBeTruthy()
    expect(queryByText('Cancel')).toBeTruthy()
  })

  it('WHEN email is pending AND cancel button was pressed SHOULD pop to top AND reset user', () => {
    mockUseMonitorSessionService.mockReturnValue({
      data: {
        expired: false,
        secret: '',
      },
      isLoading: false,
      isFetching: false,
    })
    const { getByText } = setupScreen()

    fireEvent.press(getByText('Cancel'))

    expect(useNavigation().popToTop).toHaveBeenCalled()
    expect(mockResetUser).toHaveBeenCalled()
  })
})
