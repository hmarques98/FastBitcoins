import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import createStyle from './VerifyAccount.styles'

interface VerifyAccountProps {
  onPress?(): void
  textButton?: string
  Icon: React.FC<SvgProps>
  title: string
  subtitle: string
}

const VerifyAccount = ({
  onPress,
  Icon,
  subtitle,
  title,
  textButton,
}: VerifyAccountProps) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyle(theme), [theme])
  return (
    <>
      <View style={styles.messageContainer}>
        <Icon style={styles.icon} />
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
