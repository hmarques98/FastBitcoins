import React from 'react'
/**
 * ? Local Imports
 */
import fonts from '@fonts'
import { Text, TextProps } from 'react-native'

interface ITextWrapperProps extends TextProps {
  color?: string
  fontFamily?: string
  children?: React.ReactNode
}

const TextWrapper: React.FC<ITextWrapperProps> = ({
  fontFamily = fonts.montserrat.regular,
  color = '#757575',
  children,
  ...rest
}) => {
  return (
    <Text style={{ fontFamily, color }} {...rest}>
      {children}
    </Text>
  )
}

export default TextWrapper
