const _fonts = {
  montserrat: {
    black: 'Montserrat-Black',
    blackItalic: 'Montserrat-BlackItalic',
    bold: 'Montserrat-Bold',
    boldItalic: 'Montserrat-BoldItalic',
    extraBold: 'Montserrat-ExtraBold',
    extraBoldItalic: 'Montserrat-ExtraBoldItalic',
    extraLight: 'Montserrat-ExtraLight',
    extraLightItalic: 'Montserrat-ExtraLightItalic',
    italic: 'Montserrat-Italic',
    light: 'Montserrat-Light',
    lightItalic: 'Montserrat-LightItalic',
    medium: 'Montserrat-Medium',
    mediumItalic: 'Montserrat-MediumItalic',
    regular: 'Montserrat-Regular',
    semiBold: 'Montserrat-SemiBold',
    semiBoldItalic: 'Montserrat-SemiBoldItalic',
    thin: 'Montserrat-Thin',
    thinItalic: 'Montserrat-ThinItalic',
  },
  poppins: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extraBold: 'Poppins-ExtraBold',
  },
}

export const fonts = {
  body: _fonts.poppins.regular, // 400
  header: _fonts.poppins.medium, // 500
  subtitle: _fonts.poppins.semiBold, // 600
  title: _fonts.poppins.bold, // 700
}
