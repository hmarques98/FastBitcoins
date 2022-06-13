import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUserInitialState {
  email: string
  country: string
  alphaCountryCode: string
  state?: string
  stateCode?: string
}

const initialState: IUserInitialState = {
  email: '',
  country: '',
  alphaCountryCode: '',
  state: '',
  stateCode: '',
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<Pick<IUserInitialState, 'email'>>) {
      state.email = action.payload.email
    },
    setCountry(
      state,
      action: PayloadAction<
        Pick<IUserInitialState, 'country' | 'alphaCountryCode'>
      >,
    ) {
      state.country = action.payload.country
      state.alphaCountryCode = action.payload.alphaCountryCode
    },
    setCountryState(
      state,
      action: PayloadAction<Pick<IUserInitialState, 'state' | 'stateCode'>>,
    ) {
      state.state = action.payload.state
      state.stateCode = action.payload.stateCode
    },
    resetUser() {
      return initialState
    },
  },
})

export const { setEmail, setCountry, setCountryState, resetUser } =
  userReducer.actions

export default userReducer.reducer
