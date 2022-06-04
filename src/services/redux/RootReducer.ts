import { persistCombineReducers, PersistConfig } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userReducer, {
  InitialState as UserStore,
} from './slices/user/UserReducers'

export const reducers = {
  user: userReducer,
}

export type MainState = {
  user: UserStore
}

const persistConfig: PersistConfig<{
  user: UserStore
}> = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  whitelist: ['user'],
  // debug: __DEV__,
}

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
)

export type RootState = ReturnType<typeof persistedRootReducer>

export default persistedRootReducer
