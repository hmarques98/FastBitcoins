import React, { useMemo } from 'react'
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { validateEmail } from 'utils'
import Button from '@shared-components/Button'
import TextField from '@shared-components/TextField'

import { SCREENS } from '@services/navigation/Stacks/Profile/Profile.enums'
import { ProfileStackParamList } from '@services/navigation/Stacks/Profile'
import useUserClientState from 'domain/User/useUserClientState'

import createStyles from './HomeScreen.styles'

type NavigationProps = StackNavigationProp<
  ProfileStackParamList,
  SCREENS.PROFILE_HOME
>

const HomeScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { setEmail, user } = useUserClientState()

  const { push } = useNavigation<NavigationProps>()

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
            onPress={() => push('')}
            disabled={Boolean(!validateEmail(user.email))}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default HomeScreen
