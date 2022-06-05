import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'

import createStyles from './AccountVerifiedScreen.styles'

import VerifyAccount from './components/VerifyAccount'

import CheckSuccess from 'assets/images/CheckSuccess.svg'
import EmailPending from 'assets/images/EmailPending.svg'
import useAuthClientState from 'domain/Auth/useAuthClientState'
import useMonitorSessionService from 'domain/Auth/useMonitorSessionService'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@services/navigation'
import { SCREENS } from '@services/navigation/Navigation.enums'
import useUserClientState from 'domain/User/useUserClientState'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  SCREENS.AUTH_ACCOUNT_VERIFIED
>

const THREE_SECONDS = 3000
const AccountVerifiedScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { sessionKey } = useAuthClientState()
  const { resetUser } = useUserClientState()

  const {
    data: monitorResponse,
    isLoading,
    isFetching,
  } = useMonitorSessionService(sessionKey)

  const isVerified = monitorResponse?.secret

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: SCREENS.AUTH_HOME, params: { isAuth: true } }],
        })
      }, THREE_SECONDS)
    }
  }, [isVerified, navigation])

  if (isLoading || isFetching || isVerified === undefined) return <></>

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
