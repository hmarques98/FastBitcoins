import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { isReadyRef, navigationRef } from 'react-navigation-helpers'
import { hide as hideSplashScreen } from 'react-native-bootsplash'

import { SCREENS } from '@shared-constants'
import { LightTheme, DarkTheme } from '@theme/themes'

import HomeScreen from 'ui/Auth/screens/Home'
import AccountEmail from 'ui/Auth/screens/AccountEmail'

import Header from './components/Header'

export type RootStackParamList = {
  [SCREENS.AUTH_HOME]: undefined
  [SCREENS.AUTH_ACCOUNT_EMAIL]: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const Navigation = () => {
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'
  const navigationTheme = isDarkMode ? DarkTheme : LightTheme

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
        <Stack.Screen name={SCREENS.AUTH_HOME} component={HomeScreen} />
        <Stack.Group
          screenOptions={{
            header: ({ options }) => <Header title={options.title!} />,
            headerShown: true,
          }}
        >
          <Stack.Screen
            name={SCREENS.AUTH_ACCOUNT_EMAIL}
            component={AccountEmail}
            options={{ title: 'Enter your email address' }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
