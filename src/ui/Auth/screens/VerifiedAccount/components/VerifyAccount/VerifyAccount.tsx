import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import createStyle from './VerifyAccount.styles'

interface VerifyAccountProps {
  onPress?(): void
  textButton?: string

  title: string
  subtitle: string
}

const VerifyAccount = ({
  onPress,
  subtitle,
  title,
  textButton,
  children,
}: React.PropsWithChildren<VerifyAccountProps>) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyle(theme), [theme])
  return (
    <>
      <View style={styles.messageContainer}>
        {children}
        <View style={styles.messageTextsContainer}>
          <Text style={styles.messageTitleText}>{title}</Text>
        </View>
        <Text style={styles.messageSubtitleText} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>

      {onPress && (
        <TouchableOpacity style={styles.containerButton} onPress={onPress}>
          <Text style={styles.textButton}>{textButton}</Text>
        </TouchableOpacity>
      )}
    </>
  )
}
export default VerifyAccount
