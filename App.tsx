import 'react-native-gesture-handler'
import React from 'react'
import { useColorScheme, StatusBar, Platform } from 'react-native'
import { Provider } from 'react-redux'

import Navigation from './src/services/navigation'
import { persistor, store } from './src/services/redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  const scheme = useColorScheme()
  const isDarkMode = scheme === 'dark'

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content')
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
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
