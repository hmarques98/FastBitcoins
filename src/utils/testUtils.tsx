import { render as rtlRender } from '@testing-library/react-native'
import type { RenderOptions } from '@testing-library/react-native'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { reducers } from '@services/redux/RootReducer'
import { RootState } from '@services/redux/Store'
import { QueryClient, QueryClientProvider } from 'react-query'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: Store
}

function render(ui: ReactElement, options?: ExtendedRenderOptions) {
  const { preloadedState } = options || {}

  const store =
    options?.store ||
    configureStore({
      reducer: reducers,
      preloadedState,
    })

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    )
  }

  return rtlRender(ui, { wrapper, ...options })
}

export * from '@testing-library/react-native'
export { render }
