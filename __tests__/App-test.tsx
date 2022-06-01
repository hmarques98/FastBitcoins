/**
 * @format
 */

import { Text, View } from 'react-native'
import React from 'react'
// import App from '../App'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fireEvent, render } from '@testing-library/react-native'

const App = ({ onPress }: { onPress(): void }) => {
  return (
    <View>
      <Text>Teste</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>Clique</Text>
      </TouchableOpacity>
    </View>
  )
}

it('works correctly', () => {
  const onPressMock = jest.fn()
  const { queryByText } = render(<App onPress={onPressMock} />)

  const button = queryByText('Clique')
  expect(button).toBeTruthy()
  fireEvent.press(button!)
  expect(onPressMock).toHaveBeenCalled()
})
