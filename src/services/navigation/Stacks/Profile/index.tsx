import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SCREENS } from '@services/navigation/Navigation.enums'
import HomeScreen from 'ui/Auth/screens/Home'

export type AuthStackParamList = {
  [SCREENS.AUTH_HOME]: undefined
}
const Stack = createStackNavigator<AuthStackParamList>()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.AUTH_HOME} component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
