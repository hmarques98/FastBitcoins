import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Text, View, TextInput, TextInputProps } from 'react-native'
import createStyle from './TextField.styles'

type TextFieldProps = TextInputProps & {
  label?: string
}

const TextField = ({ label, ...restProps }: TextFieldProps) => {
  const theme = useTheme()
  const styles = createStyle(theme)

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <View style={styles.textFieldContainer}>
        <TextInput
          {...restProps}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="go"
          enablesReturnKeyAutomatically
          style={styles.textField}
        />
      </View>
    </View>
  )
}
export default React.memo(TextField)
