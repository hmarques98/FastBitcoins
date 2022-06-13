import React from 'react'

import HomeScreen from '../HomeScreen'

import { fireEvent, render } from 'utils/testUtils'
import { useNavigation } from '@mocks/@react-navigation/native'
import { SCREENS } from '@services/navigation/Stacks/Auth/Auth.enums'

const setupScreen = () => {
  return render(<HomeScreen />)
}

describe('HomeScreen', () => {
  it('SHOULD render correctly', () => {
    const { queryByText } = setupScreen()
    expect(queryByText('Select your language')).toBeTruthy()
    expect(queryByText('English')).toBeTruthy()

    const button = queryByText('Continue')
    expect(button).toBeTruthy()

    fireEvent.press(button!)

    expect(useNavigation().push).toHaveBeenCalledWith(
      SCREENS.AUTH_ACCOUNT_EMAIL,
    )
  })
})
