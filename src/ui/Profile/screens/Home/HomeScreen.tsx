import React, { useMemo } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'

import createStyles from './HomeScreen.styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import CheckSuccess from 'assets/images/CheckSuccess.svg'

const HomeScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <CheckSuccess />
      <View style={styles.languageContainer}>
        <Text style={styles.titleText}>Welcome to</Text>
      </View>
    </SafeAreaView>
  )
}
export default HomeScreen
