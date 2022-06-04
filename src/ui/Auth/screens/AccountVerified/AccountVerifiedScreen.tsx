import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'

import createStyles from './AccountVerifiedScreen.styles'

import VerifyAccount from './components/VerifyAccount'

import CheckSuccess from 'assets/images/CheckSuccess.svg'
import EmailPending from 'assets/images/EmailPending.svg'

// type NavigationProps = StackNavigationProp<
//   RootStackParamList,
//   SCREENS.AUTH_ACCOUNT_VERIFIED
// >

const AccountVerifiedScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const isTrue = false
  return (
    <View style={styles.container}>
      {isTrue ? (
        <VerifyAccount
          Icon={CheckSuccess}
          title="Email verified"
          subtitle="Please wait while we redirect you"
        />
      ) : (
        <VerifyAccount
          Icon={EmailPending}
          title="Verify your email"
          subtitle="Please check your emails"
          onPress={() => {}}
          textButton="Cancelar"
        />
      )}
    </View>
  )
}
export default AccountVerifiedScreen
