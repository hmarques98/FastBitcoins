import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { isReadyRef, navigationRef } from 'react-navigation-helpers'
import { hide as hideSplashScreen } from 'react-native-bootsplash'

import { LightTheme } from '@theme/themes'

/* PLOP_INJECT_SCREEN_IMPORT */

import AuthNavigator from './Stacks/Auth'
/* PLOP_INJECT_NAVIGATOR_IMPORT */
import { SCREENS } from './Navigation.enums'
import ProfileNavigator from './Stacks/Profile'
import useAuthClientState from 'domain/Auth/useAuthClientState'

export type RootStackParamList = {
  [SCREENS.AUTH_STACK]: undefined
  [SCREENS.PROFILE_STACK]: undefined
  /* PLOP_INJECT_NAVIGATOR_PARAMS */
}

const Stack = createStackNavigator<RootStackParamList>()

const Navigation = () => {
  const navigationTheme = LightTheme

  const { isUserAuthenticated } = useAuthClientState()

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    }
  }, [])

  React.useEffect(() => {
    if (typeof isUserAuthenticated !== 'undefined')
      hideSplashScreen({ fade: true })
  }, [isUserAuthenticated])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}
      theme={navigationTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isUserAuthenticated ? (
          <>
            <Stack.Group>
              <Stack.Screen
                name={SCREENS.PROFILE_STACK}
                component={ProfileNavigator}
              />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name={SCREENS.AUTH_STACK} component={AuthNavigator} />
        )}
        {/* PLOP_INJECT_NAVIGATOR */}
        {/* PLOP_INJECT_SCREEN */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
