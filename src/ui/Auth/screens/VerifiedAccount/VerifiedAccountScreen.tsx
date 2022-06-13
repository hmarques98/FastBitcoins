import React, { useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import CheckSuccess from 'assets/images/CheckSuccess.svg'
import EmailPending from 'assets/images/EmailPending.svg'

import { AuthStackParamList } from '@services/navigation/Stacks/Auth'
import { SCREENS as AuthScreens } from '@services/navigation/Stacks/Auth/Auth.enums'
import { RootStackParamList } from '@services/navigation'

import useAuthClientState from '@domain/Auth/useAuthClientState'
import useMonitorSessionService from '@domain/Auth/useMonitorSessionService'
import useUserClientState from '@domain/User/useUserClientState'

import createStyles from './VerifiedAccountScreen.styles'
import VerifyAccount from './components/VerifyAccount'

type NavigationProps = StackNavigationProp<
  AuthStackParamList & RootStackParamList,
  AuthScreens.AUTH_ACCOUNT_VERIFIED
>

const THREE_SECONDS = 3000
const VerifiedAccountScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

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
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      {secretSessionVerified ? (
        <VerifyAccount
          title="Email verified"
          subtitle="Please wait while we redirect you"
        >
          <CheckSuccess style={styles.icon} />
        </VerifyAccount>
      ) : (
        <VerifyAccount
          title="Verify your email"
          subtitle="Please check your emails"
          onPress={() => {
            resetUser()
            navigation.popToTop()
          }}
          textButton="Cancel"
        >
          <EmailPending style={styles.icon} />
        </VerifyAccount>
      )}
    </View>
  )
}
export default VerifiedAccountScreen
