import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text, View, TextInput, TextInputProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import createStyle from './TextField.styles'

type TextFieldProps = TextInputProps & {
  label?: string
  icon?: JSX.Element
  onPress?(): void
}

const TextField = ({ label, icon, onPress, ...restProps }: TextFieldProps) => {
  const theme = useTheme()
  const styles = createStyle(theme)

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.textFieldContainer}
        onPress={onPress}
        activeOpacity={typeof onPress === 'function' ? 0.3 : 1}
      >
        <TextInput
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="go"
          enablesReturnKeyAutomatically
          style={styles.textField}
          {...restProps}
        />
        {icon}
      </TouchableOpacity>
    </View>
  )
}
export default React.memo(TextField)
