import React, { useMemo } from 'react'
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Button from '@shared-components/Button'

import { validateEmail } from 'utils'
import { RootStackParamList } from '@services/navigation'
import { SCREENS } from '@services/navigation/Navigation.enums'
import TextField from '@shared-components/TextField'

import createStyles from './AccountEmailScreen.styles'
import useUserClientState from 'domain/User/useUserClientState'
import useLoginService from 'domain/Auth/useLoginService'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  SCREENS.AUTH_ACCOUNT_EMAIL
>

const AccountEmailScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { setEmail, user } = useUserClientState()

  const { push } = useNavigation<NavigationProps>()

  const { doLogin, isLoading } = useLoginService()

  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
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

              if (response.session_key)
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
