import React, { useMemo } from 'react'
import { theme } from '@theme/themes'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { navigationRef } from 'react-navigation-helpers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import createStyles from './Header.styles'

const Header = ({ title }: { title: string }) => {
  const { top } = useSafeAreaInsets()

  const styles = useMemo(() => createStyles(theme, { marginTop: top }), [top])

  return (
    <View style={styles.container}>
      {navigationRef.canGoBack() ? (
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={30} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}

      <Text style={styles.title}>{title}</Text>

      <Image
        source={require('@assets/splash/bootsplash_logo_original.png')}
        style={styles.image}
      />
    </View>
  )
}

export default Header
