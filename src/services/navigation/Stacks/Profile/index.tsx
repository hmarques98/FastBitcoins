import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from 'ui/Profile/screens/Home'
/* PLOP_INJECT_SCREEN_IMPORT */

import { SCREENS } from './Profile.enums'

export type ProfileStackParamList = {
  [SCREENS.PROFILE_HOME]: undefined
  /* PLOP_INJECT_SCREEN_PARAMS */
}
const Stack = createStackNavigator<ProfileStackParamList>()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.PROFILE_HOME} component={HomeScreen} />

      {/* PLOP_INJECT_SCREEN */}
    </Stack.Navigator>
  )
}

export default ProfileNavigator
