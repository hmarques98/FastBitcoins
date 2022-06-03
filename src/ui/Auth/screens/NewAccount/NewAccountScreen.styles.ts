import { StyleSheet } from 'react-native'
import { ExtendedTheme } from '@react-navigation/native'
import { fonts } from '@fonts'

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

    itemListText: {
      fontFamily: fonts.title,
      fontSize: 18,
      flex: 1,
      color: colors.secondary,
    },
    itemListContainer: { marginRight: 12 },
    itemListButtonContainer: {
      flexDirection: 'row',
      paddingVertical: 14,
    },
    itemSeparator: {
      width: '100%',
      height: 1,
      backgroundColor: colors.gray,
    },
    bottomSheet: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: -0.5,
      },
      shadowOpacity: 1,
      shadowRadius: 9,

      elevation: 9,
      paddingHorizontal: 24,
    },
    indicatorBottomSheet: {
      width: 82,
      backgroundColor: colors.gray,
    },
    infoHeaderContainer: { width: '100%' },
    searchBarContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 30,
    },
    infoHeaderText: {
      textAlign: 'center',
      fontFamily: fonts.body,
      color: colors.text,
    },
  })
}
