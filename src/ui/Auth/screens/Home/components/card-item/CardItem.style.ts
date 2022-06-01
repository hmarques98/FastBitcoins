import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

interface StyleProps {
  screenWidth: number
}

export default (theme: ExtendedTheme, props: StyleProps) => {
  const { colors } = theme
  return StyleSheet.create({
    container: {
      padding: 16,
      marginTop: 16,
      borderWidth: 1,
      borderRadius: 8,
      width: props.screenWidth * 0.9,
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
    },
    descriptionTextStyle: {
      marginTop: 8,
    },
    contentContainer: {
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageColorStyle: {
      width: 15,
      height: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: colors.borderColor,
      backgroundColor: colors.calpyse,
    },
    starContainer: {
      marginLeft: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    valueTextStyle: {
      marginLeft: 8,
    },
    forkContainer: {
      marginLeft: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}
