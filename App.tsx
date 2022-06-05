import React from 'react'
import { useColorScheme, StatusBar, Platform } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getVisibilityStatus } from 'react-native-bootsplash'

import { persistor, store } from './src/services/redux/Store'
import Navigation from './src/services/navigation'

const queryClient = new QueryClient()

const App = () => {
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'

  React.useEffect(() => {
    getVisibilityStatus().then(result => {
      if (result === 'visible') StatusBar.setBarStyle('light-content')
    })
    const isAndroid = Platform.OS === 'android'
    if (isAndroid) {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)')
      StatusBar.setTranslucent(true)
    }
  }, [scheme, isDarkMode])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {__DEV__ && <FlipperAsyncStorage />}
            <Navigation />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default gestureHandlerRootHOC(App)

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient })
  })
}
