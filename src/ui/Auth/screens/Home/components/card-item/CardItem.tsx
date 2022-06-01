import React, { useCallback, useMemo } from 'react'
import { View, StyleProp, ViewStyle, useWindowDimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-dynamic-vector-icons'
/**
 * ? Local Imports
 */
import createStyles from './CardItem.style'
import { ICardItem } from '@services/models'
import Text from '@shared-components/text-wrapper/TextWrapper'
import { TouchableOpacity } from 'react-native-gesture-handler'

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>

interface ICardItemProps {
  style?: CustomStyleProp
  data: ICardItem
  onPress: () => void
}

const CardItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme()
  const { colors } = theme

  const { width } = useWindowDimensions()

  const styles = useMemo(
    () => createStyles(theme, { screenWidth: width }),
    [theme, width],
  )

  const { language, star, fork } = data

  const Language = useCallback(
    () => (
      <View style={styles.languageContainer}>
        <View style={styles.languageColorStyle} />
        <Text style={styles.valueTextStyle}>{language}</Text>
      </View>
    ),
    [
      language,
      styles.languageColorStyle,
      styles.languageContainer,
      styles.valueTextStyle,
    ],
  )

  const Star = () => (
    <View style={styles.starContainer}>
      <Icon name="star-o" type="FontAwesome" color={colors.text} />
      <Text style={styles.valueTextStyle}>{star}</Text>
    </View>
  )

  const Fork = () => (
    <View style={styles.forkContainer}>
      <Icon name="code-fork" type="FontAwesome" color={colors.text} />
      <Text style={styles.valueTextStyle}>{fork}</Text>
    </View>
  )

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Language />
        <Star />
        <Fork />
      </View>
    </TouchableOpacity>
  )
}

export default CardItem
