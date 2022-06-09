import React from 'react'

import AccountEmailScreen from '../AccountEmailScreen'

import { render, fireEvent, waitFor } from 'utils/testUtils'
import { SCREENS } from '@services/navigation/Stacks/Auth/Auth.enums'
import { useNavigation } from '@mocks/@react-navigation/native'

const mockDoLogin = jest.fn()
jest.mock('@domain/Auth/useLoginService', () =>
  jest.fn(() => {
    return { doLogin: mockDoLogin, isLoading: false }
  }),
)

const setupScreen = () => {
  return render(<AccountEmailScreen />)
}

describe('AccountEmailScreen', () => {
  it('SHOULD render correctly', () => {
    setupScreen()
  })

  it('SHOULD change email correctly', async () => {
    const { queryByPlaceholderText } = setupScreen()

    const textField = queryByPlaceholderText('Your email address')
    expect(textField).toHaveProp('value', '')

    fireEvent.changeText(textField!, 'email@email.com')
    await waitFor(() => {
      expect(queryByPlaceholderText('Your email address')).toHaveProp(
        'value',
        'email@email.com',
      )
    })
  })

  describe('GIVEN a valid email typed SHOULD enable button to continue', () => {
    it('AND WHEN email typed is a registered email SHOULD navigate to Account Verified Screen', async () => {
      mockDoLogin.mockResolvedValueOnce({ session_key: '123' })
      const { queryByPlaceholderText, getByText } = setupScreen()

      const textField = queryByPlaceholderText('Your email address')
      expect(textField).toHaveProp('value', '')

      const button = getByText('Continue')

      fireEvent.press(button)

      expect(mockDoLogin).not.toHaveBeenCalled()

      fireEvent.changeText(textField!, 'email@email.com')

      expect(textField).toHaveProp('value', 'email@email.com')

      fireEvent.press(button)

      expect(mockDoLogin).toHaveBeenCalledWith('email@email.com')
      await waitFor(() =>
        expect(useNavigation().push).toHaveBeenCalledWith(
          SCREENS.AUTH_ACCOUNT_VERIFIED,
        ),
      )
    })

    it('AND WHEN email typed is a new account email SHOULD navigate to New Account Screen', async () => {
      mockDoLogin.mockResolvedValueOnce({ session_key: '' })
      const { queryByPlaceholderText, getByText } = setupScreen()

      const textField = queryByPlaceholderText('Your email address')
      expect(textField).toHaveProp('value', '')

      const button = getByText('Continue')

      fireEvent.press(button)

      expect(mockDoLogin).not.toHaveBeenCalled()

      fireEvent.changeText(textField!, 'email@email.com')

      expect(textField).toHaveProp('value', 'email@email.com')

      fireEvent.press(button)

      expect(mockDoLogin).toHaveBeenCalledWith('email@email.com')
      await waitFor(() =>
        expect(useNavigation().push).toHaveBeenCalledWith(
          SCREENS.AUTH_NEW_ACCOUNT,
        ),
      )
    })
  })
})
