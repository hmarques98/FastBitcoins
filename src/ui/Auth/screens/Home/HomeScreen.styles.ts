import { StyleSheet } from 'react-native'
import { ExtendedTheme } from '@react-navigation/native'
import { fonts } from '@fonts'

export default (theme: ExtendedTheme) => {
  const { colors } = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: colors.secondary,
    },
    titleText: {
      fontSize: 32,
      fontFamily: fonts.title,
      color: colors.primary,
    },

    circleContainer: {
      height: 232,
      width: 232,
      borderRadius: 116,
      backgroundColor: colors.separator,
    },
    languageContainer: { width: '100%', alignItems: 'center' },
    buttonsContainer: { padding: 24, width: '100%' },
    selectLanguageButtonContainer: {
      borderColor: colors.borderColor,
      borderWidth: 1,
      paddingHorizontal: 28,
      paddingVertical: 20,
      marginBottom: 35,
      marginTop: 52,
    },
    selectLanguageButtonText: {
      color: colors.placeholder,
      fontFamily: fonts.body,
    },
  })
}
