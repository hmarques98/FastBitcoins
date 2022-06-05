import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native'

import createStyles from './AccountVerifiedScreen.styles'

import VerifyAccount from './components/VerifyAccount'

import CheckSuccess from 'assets/images/CheckSuccess.svg'
import EmailPending from 'assets/images/EmailPending.svg'
import useAuthClientState from 'domain/Auth/useAuthClientState'
import useMonitorSessionService from 'domain/Auth/useMonitorSessionService'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '@services/navigation/Stacks/Auth'

import { SCREENS as AuthScreens } from '@services/navigation/Stacks/Auth/Auth.enums'
import useUserClientState from 'domain/User/useUserClientState'
import { RootStackParamList } from '@services/navigation'

type NavigationProps = StackNavigationProp<
  AuthStackParamList & RootStackParamList,
  AuthScreens.AUTH_ACCOUNT_VERIFIED
>

const THREE_SECONDS = 3000
const AccountVerifiedScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  useIsFocused()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { sessionKey, authenticateSession } = useAuthClientState()
  const {
    resetUser,
    user: { email },
  } = useUserClientState()

  const {
    data: monitorResponse,
    isLoading,
    isFetching,
  } = useMonitorSessionService(sessionKey)

  const secretSessionVerified = monitorResponse?.secret

  useEffect(() => {
    if (secretSessionVerified) {
      setTimeout(() => {
        const { expired, secret } = monitorResponse || {}
        authenticateSession({ expired, secret, email })
      }, THREE_SECONDS)
    }
  }, [
    authenticateSession,
    monitorResponse,
    navigation,
    secretSessionVerified,
    email,
  ])

  if (isLoading || isFetching || secretSessionVerified === undefined)
    return <></>

  return (
    <View style={styles.container}>
      {secretSessionVerified ? (
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
          onPress={() => {
            resetUser()
            navigation.popToTop()
          }}
          textButton="Cancelar"
        />
      )}
    </View>
  )
}
export default AccountVerifiedScreen
