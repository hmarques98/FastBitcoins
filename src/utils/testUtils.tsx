import { render as rtlRender } from '@testing-library/react-native'
import { renderHook as rltRenderHook } from '@testing-library/react-hooks'
import type { RenderOptions } from '@testing-library/react-native'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { reducers } from '@services/redux/RootReducer'
import { RootState } from '@services/redux/Store'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthContextProvider from '@domain/Auth/AuthContext'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: Store
}

const queryClient = new QueryClient()

const CustomQueryClientProvider = ({
  children,
}: PropsWithChildren<unknown>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
function render(ui: ReactElement, options?: ExtendedRenderOptions) {
  const { preloadedState } = options || {}

  const store =
    options?.store ||
    configureStore({
      reducer: reducers,
      preloadedState,
    })

  const wrapper = ({ children }: PropsWithChildren<unknown>) => {
    return (
      <Provider store={store}>
        <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
      </Provider>
    )
  }

  return rtlRender(ui, { wrapper, ...options })
}

const renderHook = <TProps, TResult>(
  hookCallback: (props: TProps) => TResult,
) => {
  return rltRenderHook(hookCallback, {
    wrapper: ({ children }) => (
      <CustomQueryClientProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </CustomQueryClientProvider>
    ),
  })
}
export * from '@testing-library/react-native'
export { render, renderHook }
