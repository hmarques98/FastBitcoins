import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '@services/models'

export interface InitialState {
  userData: IUser
}

const initialState: InitialState = {
  userData: { email: '' },
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<IUser>) {
      state.userData.email = action.payload.email
    },
  },
})

export const { setEmail } = userReducer.actions

export default userReducer.reducer
