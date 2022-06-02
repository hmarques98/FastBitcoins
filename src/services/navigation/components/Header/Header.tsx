import React from 'react'
import { theme } from '@theme/themes'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { navigationRef } from 'react-navigation-helpers'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import createStyles from './Header.styles'

const Header = ({ title }: { title: string }) => {
  const { top } = useSafeAreaInsets()

  const styles = createStyles(theme, { marginTop: top })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigationRef.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={30} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <Image
        source={require('@assets/splash/bootsplash_logo_original.png')}
        style={styles.image}
      />
    </View>
  )
}

export default Header
