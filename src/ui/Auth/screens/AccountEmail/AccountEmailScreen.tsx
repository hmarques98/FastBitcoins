import React, { useMemo } from 'react'
import { Keyboard, Text, View, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native'

import createStyles from './AccountEmailScreen.styles'
import { TextInput } from 'react-native-gesture-handler'
import { fonts } from '@fonts'
import Button from '@shared-components/Button'
import { validateEmail } from 'utils'
import useUserService from '../Home/hooks/useUserClientService'

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
        <View style={{ width: '100%' }}>
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: fonts.subtitle,
                fontSize: 16,
              }}
            >
              Email
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 18,
              paddingHorizontal: 16,
              borderColor: '#000',
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <TextInput
              onSubmitEditing={() => {}}
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
              returnKeyType="go"
              enablesReturnKeyAutomatically
              value={user.email}
              onChangeText={setEmail}
              placeholder="Your email address"
              style={{
                color: theme.colors.text,
                fontFamily: fonts.body,
                fontSize: 18,
              }}
            />
          </View>
        </View>
        <View style={{ width: '100%' }}>
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
