import React from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { persistor, store } from './src/services/redux/Store'
import Navigation from './src/services/navigation'
import AuthContextProvider from '@domain/Auth/AuthContext'

const isDevEnvironment = __DEV__ && !process.env.JEST_WORKER_ID
const queryClient = new QueryClient()

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {isDevEnvironment && <FlipperAsyncStorage />}
            <AuthContextProvider>
              <Navigation />
            </AuthContextProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default gestureHandlerRootHOC(App)

if (isDevEnvironment) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient })
  })
}
