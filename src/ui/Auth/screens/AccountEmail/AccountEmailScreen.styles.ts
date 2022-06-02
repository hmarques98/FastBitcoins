import { StyleSheet } from 'react-native'
import { ExtendedTheme } from '@react-navigation/native'

export default (theme: ExtendedTheme) => {
  const { colors } = theme
  return StyleSheet.create({
    touchableContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingVertical: 32,
      justifyContent: 'space-between',
    },

    buttonContainer: { width: '100%' },
  })
}
