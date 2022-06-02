import { DefaultTheme, ExtendedTheme } from '@react-navigation/native'

export const palette = {
  primary: '#FFB81C',
  secondary: '#101820',
  background: '#F7F8F7',
  white: '#fff',
  black: '#101214',
  gray: '#E7E8E9',
  button: '#FFB81C',
  shadow: '#757575',
  text: '#707070',
  textDisabled: '#CFD1D2',
  placeholder: '#999999',
  borderColor: '#CCCCCC',
  borderColorDark: '#CCCCCC',
  danger: 'rgb(208, 2, 27)',
  title: '#707070',
  separator: '#C4C4C4',
}

export const theme = {
  dark: false,
  colors: {
    ...palette,
    ...DefaultTheme.colors,
  },
}

export const LightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
  },
}

export const DarkTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...LightTheme.colors,
    background: palette.black,
    text: palette.white,
    borderColor: palette.borderColorDark,
  },
}
