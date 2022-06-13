import { fonts } from '@fonts'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export default (theme: ExtendedTheme) => {
  return StyleSheet.create({
    messageContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    messageTextsContainer: { marginBottom: 24 },
    messageTitleText: {
      fontFamily: fonts.title,
      fontSize: 32,
      color: theme.colors.secondary,
    },
    messageSubtitleText: {
      fontFamily: fonts.body,
      fontSize: 21,
      color: theme.colors.text,
    },
    containerButton: { alignContent: 'flex-end' },
    textButton: {
      fontFamily: fonts.subtitle,
      fontSize: 21,
      color: theme.colors.primary,
    },
  })
}
