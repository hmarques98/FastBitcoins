import React, { useMemo } from 'react'
import { Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthStackParamList } from '@services/navigation/Stacks/Auth'
import { SCREENS } from '@services/navigation/Stacks/Auth/Auth.enums'
import Button from '@shared-components/Button'

import createStyles from './HomeScreen.styles'

type NavigationProps = StackNavigationProp<
  AuthStackParamList,
  SCREENS.AUTH_HOME
>

const HomeScreen = () => {
  const theme = useTheme()
  const { push } = useNavigation<NavigationProps>()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.circleContainer} />
      <View style={styles.languageContainer}>
        <Text style={styles.titleText}>Select your language</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.selectLanguageButtonContainer}>
            <Text style={styles.selectLanguageButtonText}>English</Text>
          </TouchableOpacity>

          <Button
            title="Continue"
            onPress={() => push(SCREENS.AUTH_ACCOUNT_EMAIL)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
