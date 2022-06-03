import React, { useMemo } from 'react'
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Button from '@shared-components/Button'

import { validateEmail } from 'utils'
import { RootStackParamList } from '@services/navigation'
import { SCREENS } from '@services/navigation/Navigation.enums'
import TextField from '@shared-components/TextField'

import createStyles from './CountriesListScreen.styles'
import useUserClientService from 'domain/User/hooks/useUserClientService'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  SCREENS.AUTH_COUNTRIES_LIST
>

const CountriesListScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { setEmail, user } = useUserClientService()

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
            onPress={() => push(SCREENS.AUTH_HOME)}
            disabled={Boolean(!validateEmail(user.email))}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default CountriesListScreen
