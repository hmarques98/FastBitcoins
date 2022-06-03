import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from './models/interfaces'

export interface InitialState {
  userData: IUser
}

const initialState: InitialState = {
  userData: { email: '', country: '' },
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<Pick<IUser, 'email'>>) {
      state.userData.email = action.payload.email
    },
    setCountry(state, action: PayloadAction<Pick<IUser, 'country'>>) {
      state.userData.country = action.payload.country
    },
    setCountryState(state, action: PayloadAction<Pick<IUser, 'state'>>) {
      state.userData.state = action.payload.state
    },
  },
})

export const { setEmail, setCountry, setCountryState } = userReducer.actions

export default userReducer.reducer
