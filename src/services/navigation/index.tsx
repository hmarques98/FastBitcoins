import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { isReadyRef, navigationRef } from 'react-navigation-helpers'
import { hide as hideSplashScreen } from 'react-native-bootsplash'

import { LightTheme } from '@theme/themes'

/* PLOP_INJECT_SCREEN_IMPORT */

import AuthNavigator from './Stacks/Auth'

export type RootStackParamList = {
  /* PLOP_INJECT_SCREEN_PARAMS */
}

const Stack = createStackNavigator<RootStackParamList>()

const Navigation = () => {
  const navigationTheme = LightTheme

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    }
  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true

        hideSplashScreen()
        StatusBar.setBarStyle('light-content')
      }}
      theme={navigationTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <AuthNavigator />
        {/* PLOP_INJECT_SCREEN */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
