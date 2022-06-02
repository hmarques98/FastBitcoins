import { fonts } from '@fonts'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export default (theme: ExtendedTheme) => {
  const { colors } = theme
  return StyleSheet.create({
    container: { width: '100%' },
    labelContainer: { marginBottom: 8 },
    labelText: {
      color: colors.text,
      fontFamily: fonts.subtitle,
      fontSize: 16,
    },
    textFieldContainer: {
      backgroundColor: 'white',
      paddingVertical: 18,
      paddingHorizontal: 16,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
    },
    textField: {
      color: colors.text,
      fontFamily: fonts.body,
      fontSize: 18,
    },
  })
}
