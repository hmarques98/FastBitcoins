import { configureStore } from '@reduxjs/toolkit'
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore } from 'redux-persist'

import { rootReducer } from './RootReducer'

const middleware: ThunkMiddlewareFor<unknown>[] = []
const isDevEnvironment = __DEV__ && !process.env.JEST_WORKER_ID

if (isDevEnvironment) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default
  middleware.push(createDebugger())
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof rootReducer>

const persistor = persistStore(store, null)

export { store, persistor }
