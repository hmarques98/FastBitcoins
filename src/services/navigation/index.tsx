import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { isReadyRef, navigationRef } from 'react-navigation-helpers'
import { hide as hideSplashScreen } from 'react-native-bootsplash'

import { SCREENS } from '@shared-constants'
import { LightTheme, DarkTheme } from '@theme/themes'

import HomeScreen from 'ui/Auth/screens/Home'

const Stack = createStackNavigator()

const Navigation = () => {
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'

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
        setTimeout(() => {
          hideSplashScreen()
          StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content')
        }, 2000)
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
