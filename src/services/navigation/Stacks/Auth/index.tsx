import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SCREENS } from './Auth.enums'
import AccountEmail from '@ui/Auth/screens/AccountEmail'
import VerifiedAccount from '@ui/Auth/screens/VerifiedAccount'
import HomeScreen from '@ui/Auth/screens/Home'
import NewAccount from '@ui/Auth/screens/NewAccount'

import Header from '../../components/Header'

export type AuthStackParamList = {
  [SCREENS.AUTH_HOME]: undefined
  [SCREENS.AUTH_ACCOUNT_EMAIL]: undefined
  [SCREENS.AUTH_NEW_ACCOUNT]: undefined

  /* PLOP_INJECT_SCREEN_PARAMS */
  [SCREENS.AUTH_ACCOUNT_VERIFIED]: undefined
}
const Stack = createStackNavigator<AuthStackParamList>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.AUTH_HOME} component={HomeScreen} />
      <Stack.Screen
        name={SCREENS.AUTH_ACCOUNT_VERIFIED}
        component={VerifiedAccount}
        options={{ title: 'Your title' }}
      />
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
        <Stack.Screen
          name={SCREENS.AUTH_NEW_ACCOUNT}
          component={NewAccount}
          options={{ title: 'Your new account' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default AuthNavigator
