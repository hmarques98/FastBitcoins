import { fonts } from '@fonts'
import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

export default (
  theme: ExtendedTheme,
  props: {
    marginTop: number
  },
) => {
  return StyleSheet.create({
    container: {
      marginTop: props.marginTop,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    image: { width: 20, height: 26 },
    title: {
      fontFamily: fonts.subtitle,
      color: theme.colors.secondary,
    },
  })
}
