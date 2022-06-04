import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from './models/interfaces'

export interface InitialState {
  userData: IUser
}

const initialState: InitialState = {
  userData: { email: '', country: '', alphaCountryCode: '' },
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
    setCountryState(state, action: PayloadAction<Pick<IUser, 'state'>>) {
      state.userData.state = action.payload.state
    },
  },
})

export const { setEmail, setCountry, setCountryState } = userReducer.actions

export default userReducer.reducer
