import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'

import createStyles from './AccountVerifiedScreen.styles'

import VerifyAccount from './components/VerifyAccount'

import CheckSuccess from 'assets/images/CheckSuccess.svg'
import EmailPending from 'assets/images/EmailPending.svg'
import useLoginService from 'domain/Auth/useLoginService'
import useMonitorSession from 'domain/Auth/useMonitorSession'

// type NavigationProps = StackNavigationProp<
//   RootStackParamList,
//   SCREENS.AUTH_ACCOUNT_VERIFIED
// >

const AccountVerifiedScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { data, isLoading } = useLoginService()
  const { data: monitorResponse } = useMonitorSession(data?.session_key)

  const isVerified = monitorResponse?.secret

  if (isLoading) return <></>
  return (
    <View style={styles.container}>
      {isVerified ? (
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
