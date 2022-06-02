import React, { useMemo } from 'react'
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native'

import createStyles from './AccountEmailScreen.styles'
import Button from '@shared-components/Button'
import { validateEmail } from 'utils'
import useUserService from '../Home/hooks/useUserClientService'

import TextField from '@shared-components/TextField'

const AccountEmailScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { setEmail, user } = useUserService()

  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
        <TextField value={user.email} onChangeText={setEmail} label="Email" />
        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={() => {}}
            disabled={Boolean(!validateEmail(user.email))}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default AccountEmailScreen
