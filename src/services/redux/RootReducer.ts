import { persistCombineReducers, PersistConfig } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userReducer, {
  IUserInitialState as UserStore,
} from './slices/user/UserReducer'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { Action } from '@reduxjs/toolkit'

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

const persistedRootReducer = persistCombineReducers(persistConfig, reducers)

type State =
  | ({
      user: UserStore
    } & PersistPartial)
  | undefined

export const rootReducer = (state: State, action: Action<any>) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return persistedRootReducer(state, action)
}

export default persistedRootReducer
