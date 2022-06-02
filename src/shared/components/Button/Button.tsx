import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import createStyle from './Button.styles'

type ButtonProps = {
  onPress(): void
  title: string
} & TouchableOpacityProps

const Button = ({ onPress, title, disabled, ...restProps }: ButtonProps) => {
  const theme = useTheme()
  const styles = createStyle(theme, { disabled: Boolean(disabled) })

  return (
    <TouchableOpacity
      {...restProps}
      style={styles.containerButton}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  )
}
export default Button
