import { fonts } from '@fonts'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

type Props = {
  disabled?: boolean
}
export default (theme: ExtendedTheme, props: Props) => {
  const { colors } = theme
  return StyleSheet.create({
    containerButton: {
      backgroundColor: props.disabled ? colors.gray : colors.primary,
      paddingVertical: 18,
      alignItems: 'center',
    },
    textButton: {
      fontFamily: fonts.title,
      color: props.disabled ? colors.textDisabled : colors.secondary,
      fontSize: 16,
    },
  })
}
