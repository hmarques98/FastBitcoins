import { ExtendedTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'

interface StyleProps {
  screenWidth: number
}

export default (theme: ExtendedTheme, props: StyleProps) => {
  const { colors } = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
      marginTop: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileDetailContainer: {
      marginTop: 16,
      width: props.screenWidth * 0.9,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    cardStyle: {
      minWidth: props.screenWidth * 0.4,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowColor: '#757575',
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    valueTextStyle: {
      marginTop: 8,
    },
  })
}
