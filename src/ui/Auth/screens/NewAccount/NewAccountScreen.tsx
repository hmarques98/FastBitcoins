import React, { useMemo } from 'react'
import { Keyboard, View, TouchableWithoutFeedback, Text } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Button from '@shared-components/Button'

import { RootStackParamList } from '@services/navigation'
import { SCREENS } from '@services/navigation/Navigation.enums'
import TextField from '@shared-components/TextField'

import createStyles from './NewAccountScreen.styles'
import { fonts } from '@fonts'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  SCREENS.AUTH_NEW_ACCOUNT
>

const NewAccountScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { push } = useNavigation<NavigationProps>()

  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <View
            style={{ width: '100%', alignItems: 'center', marginBottom: 30 }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.body,
                color: theme.colors.text,
              }}
            >
              Bacon ipsum dolor amet kielbasa filet mignon biltong hamburger
              tri-tip sirloin.
            </Text>
          </View>
          <TextField
            value={'Brazil'}
            onChangeText={() => {}}
            label="What country do you live in?"
            placeholder="Select country"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={() => push(SCREENS.AUTH_HOME)}
            disabled
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default NewAccountScreen
