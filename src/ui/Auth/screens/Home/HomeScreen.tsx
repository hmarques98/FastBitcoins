import React, { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import createStyles from './HomeScreen.style'

import Text from '@shared-components/text-wrapper/TextWrapper'
import useUserClientService from './hooks/useUserClientService'
import { localTranslate, localTranslateFormat } from 'shared/localization'

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme()

  const { width } = useWindowDimensions()

  const { setUser, user } = useUserClientService()

  const styles = useMemo(
    () => createStyles(theme, { screenWidth: width }),
    [theme, width],
  )

  React.useEffect(() => {
    const mockUserData = {
      id: '301395-3150134',
      username: 'FreakyCoder',
      fullName: 'Kuray',
      email: 'freakycoder@gmail.com',
      socialType: 'google',
      creationDate: 1652631678000,
      photo: null,
    }
    setUser(mockUserData)
  }, [setUser])

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {localTranslateFormat(
          localTranslate.auth.home.fullName,
          'Henrique',
          23,
        )}
      </Text>
      <Text>Email{user?.email}</Text>
      <Text>Username{user?.username}</Text>
    </SafeAreaView>
  )
}

export default HomeScreen
