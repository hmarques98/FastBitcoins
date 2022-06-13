import React, { useMemo } from 'react'
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Button from '@shared-components/Button'

import { validateEmail } from 'utils'
import { AuthStackParamList } from '@services/navigation/Stacks/Auth'

import { SCREENS } from '@services/navigation/Stacks/Auth/Auth.enums'
import TextField from '@shared-components/TextField'

import useUserClientState from '@domain/User/useUserClientState'
import useLoginService from '@domain/Auth/useLoginService'

import createStyles from './AccountEmailScreen.styles'

type NavigationProps = StackNavigationProp<
  AuthStackParamList,
  SCREENS.AUTH_ACCOUNT_EMAIL
>

const AccountEmailScreen = () => {
  const theme = useTheme()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const styles = useMemo(() => createStyles(theme), [theme])
  const { push } = useNavigation<NavigationProps>()

  const { setEmail, user } = useUserClientState()

  const { doLogin, isLoading } = useLoginService()

  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <TextField
          value={user.email}
          onChangeText={setEmail}
          label="Email"
          placeholder="Your email address"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={async () => {
              const response = await doLogin(user.email)

              if (response.sessionKey)
                return push(SCREENS.AUTH_ACCOUNT_VERIFIED)
              push(SCREENS.AUTH_NEW_ACCOUNT)
            }}
            disabled={Boolean(!validateEmail(user.email)) || isLoading}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default AccountEmailScreen
