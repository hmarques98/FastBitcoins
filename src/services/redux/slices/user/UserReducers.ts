import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from './models/interfaces'

export interface InitialState {
  userData: IUser
}

const initialState: InitialState = {
  userData: {
    email: '',
    country: '',
    alphaCountryCode: '',
    state: '',
    stateCode: '',
  },
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<Pick<IUser, 'email'>>) {
      state.userData.email = action.payload.email
    },
    setCountry(
      state,
      action: PayloadAction<Pick<IUser, 'country' | 'alphaCountryCode'>>,
    ) {
      state.userData.country = action.payload.country
      state.userData.alphaCountryCode = action.payload.alphaCountryCode
    },
    setCountryState(
      state,
      action: PayloadAction<Pick<IUser, 'state' | 'stateCode'>>,
    ) {
      state.userData.state = action.payload.state
      state.userData.stateCode = action.payload.stateCode
    },
    resetUser(state) {
      state.userData = initialState as unknown as IUser
    },
  },
})

export const { setEmail, setCountry, setCountryState, resetUser } =
  userReducer.actions

export default userReducer.reducer
