import React, { useMemo } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { RootStackParamList } from '@services/navigation'
import Button from '@shared-components/Button'
import { SCREENS } from '@services/navigation/Navigation.enums'

import createStyles from './HomeScreen.style'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  SCREENS.AUTH_HOME
>
const HomeScreen = () => {
  const theme = useTheme()
  const { push } = useNavigation<NavigationProps>()

  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <SafeAreaView style={styles.container}>
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
